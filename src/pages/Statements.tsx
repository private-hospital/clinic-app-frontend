import { useNavigate } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import { assertAuth } from '../service/navigationUtils';
import { UserRoles } from '../types/users';
import '../styles/authPages.css';
import Header from '../components/Header';
import { AppointmentStatuses } from '../types/appointments';
import Pagination from '../components/Pagination';
import {
  StatementFilterPropsDto,
  StatementRegistryDto,
} from '../types/statements';
import '../styles/Statements.css';
import Button from '../components/Button';
import FilterButton from '../components/FilterButton';
import FilterModal from '../components/FilterModal';
import api from '../service/axiosUtils';

const Statements = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<StatementRegistryDto | null>(null);
  const [filterProps, setFilterProps] = useState<StatementFilterPropsDto>({
    sortBy: 'id',
    order: 'asc',
  });
  const authCtx = useContext(AuthContext)!;
  const navigate = useNavigate();

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-menu') && !target.closest('.dots-icon')) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    assertAuth(navigate, authCtx, [UserRoles.CLINIC_HEAD]);
  }, [navigate, authCtx]);

  useEffect(() => {
    setPage(1);
  }, [filterProps]);

  useEffect(() => {
    fetchStatements();
  }, [page, filterProps, filterProps]);

  const fetchStatements = async () => {
    try {
      const requestBody: StatementFilterPropsDto = {
        services: filterProps.services || [],
        statuses: filterProps.statuses || [],
        sortBy: filterProps.sortBy || 'id',
        order: filterProps.order || 'asc',
      };

      const response = await api.post<
        StatementRegistryDto,
        StatementFilterPropsDto
      >(`/owner/statements?p=${page}&q=10`, requestBody);

      console.log(requestBody);
      console.log(response);

      setData(response);
    } catch (error) {
      console.error('Error fetching statements:', error);
    }
  };

  function buildQueryParams(filterProps: StatementFilterPropsDto): string {
    const params = new URLSearchParams();
    if (filterProps.services) {
      for (const service of filterProps.services) {
        params.append('services', service);
      }
    }
    if (filterProps.statuses) {
      for (const status of filterProps.statuses) {
        params.append('statuses', status);
      }
    }
    if (filterProps.sortBy) {
      params.set('sortBy', filterProps.sortBy);
    }
    if (filterProps.order) {
      params.set('order', filterProps.order);
    }
    return params.toString();
  }

  const downloadStatement = async (filterProps: StatementFilterPropsDto) => {
    try {
      const queryString = buildQueryParams(filterProps);
      const response = await api.getBlob(
        `/owner/statements/export?${queryString}`,
      );
      const fileBlob = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(fileBlob);
      window.open(fileURL, '_blank');
    } catch (error) {
      console.error('Error downloading statement PDF:', error);
    }
  };

  const downloadInvoice = async (id: number) => {
    try {
      const response = await api.getBlob(
        `/owner/invoices/export?invoiceId=${id}`,
      );
      const fileBlob = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(fileBlob);
      window.open(fileURL, '_blank');
    } catch (error) {
      console.error('Error downloading invoice PDF:', error);
    }
  };

  const formatDate = (ts: number): string => {
    if (!ts) return '-';
    const date = new Date(ts);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, '0');
    const mins = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hour}:${mins}`;
  };

  return (
    <div className="auth-body">
      <Header />
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={(newFilter) => setFilterProps(newFilter)}
      />
      <div className="s-registry-holder">
        <div className="s-controls-block">
          <h1 className="s-page-title">Відомості</h1>
          <div className="s-buttons-holder">
            <Button
              type="primary"
              text="Завантажити відомість"
              isSubmit={false}
              onClick={() => downloadStatement(filterProps)}
              css={{
                width: 'fit-content',
                height: '3rem',
                fontSize: '1rem',
                fontWeight: 300,
                paddingLeft: '2rem',
                paddingRight: '2rem',
              }}
            />
            <FilterButton onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
        <table className="s-registry-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Назва послуги</th>
              <th>ПІБ</th>
              <th>Сума (зі знижкою)</th>
              <th>Дата проведення</th>
              <th>Дата виконання</th>
              <th>Стан виконання</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.entries.map((p) => {
                return (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.service}</td>
                    <td>{p.patientName}</td>
                    <td>{p.total}</td>
                    <td>{formatDate(p.appointmentDate)}</td>
                    <td>{p.endDate ? formatDate(p.endDate) : '-'}</td>
                    <td>
                      <div
                        className="s-badge"
                        style={
                          p.status === AppointmentStatuses.COMPLETED
                            ? { borderColor: '#00B11D', color: '#00B11D' }
                            : p.status === AppointmentStatuses.PLANNED
                              ? { borderColor: '#4699e6', color: '#4699e6' }
                              : { borderColor: '#C70000', color: '#C70000' }
                        }
                      >
                        {p.status === AppointmentStatuses.COMPLETED
                          ? 'Виконано'
                          : p.status === AppointmentStatuses.PLANNED
                            ? 'Заплановано'
                            : 'Скасовано'}
                      </div>
                    </td>
                    <td className="icon-cell">
                      {openDropdownId === p.id && (
                        <div
                          className="dropdown-menu"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => downloadInvoice(p.invoiceId)}
                          >
                            Завантажити рахунок
                          </button>
                        </div>
                      )}
                      <img
                        src={`${import.meta.env.VITE_CDN_BASE_URL}/svg/dots.svg`}
                        alt="dots icon"
                        className="dots-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(p.id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {(!data || data.entries.length === 0) && (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>
            Немає записів
          </p>
        )}
        <Pagination
          setPage={setPage}
          page={page}
          totalPages={data ? data.totalPages : 1}
        />
      </div>
    </div>
  );
};

export default Statements;
