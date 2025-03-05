import { useNavigate } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import { assertAuth } from '../service/navigationUtils';
import { UserRoles } from '../types/users';
import Header from '../components/Header';
import '../styles/authPages.css';
import Select from '../components/Select';
import Pagination from '../components/Pagination';
import {
  PriceListRegistryDto,
  PriceListState,
  priceListsTestData,
} from '../types/priceLists';
import '../styles/PriceLists.css';

const PriceLists = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)!;
  const [page, setPage] = useState(1);
  const [isArchived, setIsArchived] = useState(false);
  const [data, setData] = useState<PriceListRegistryDto | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest('.pl-dropdown-menu') &&
        !target.closest('.pl-dots-icon')
      ) {
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
  }, [isArchived]);

  useEffect(() => {
    const perPage = 4;
    const filteredEntries = priceListsTestData.filter(
      (p) => p.isArchived === isArchived,
    );
    const totalPages = Math.ceil(filteredEntries.length / perPage);
    const startIndex = (page - 1) * perPage;
    const pageEntries = filteredEntries.slice(startIndex, startIndex + perPage);

    setData({
      totalPages,
      perPage,
      page,
      entries: pageEntries,
    });
  }, [page, isArchived, setData]);

  const formatDate = (ts: number): string => {
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
      <div className="a-registry-holder">
        <div className="a-controls-block">
          <h1 className="a-page-title">Прайс-листи</h1>
          <div className="a-buttons-holder">
            <Select
              label=""
              selectId="appointment-status"
              onChange={(e) => setIsArchived(e.target.value === 'true')}
              options={[
                {
                  label: 'Доступні',
                  value: 'false',
                },
                {
                  label: 'Архівовані',
                  value: 'true',
                },
              ]}
              css={{ fontSize: '1rem', height: '3rem' }}
            />
          </div>
        </div>
        <table className="a-registry-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Назва</th>
              <th>{isArchived ? 'Причина архівування' : 'Стан'}</th>
              <th style={isArchived ? {} : { width: '20px' }}>
                {isArchived ? 'Дата архівування' : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {isArchived &&
              data &&
              data.entries.map((p) => {
                return (
                  <tr>
                    <td>{p.id}</td>
                    <td>{p.title}</td>
                    <td>{p.archivationReason}</td>
                    <td>{formatDate(p.archivationDate!)}</td>
                  </tr>
                );
              })}
            {!isArchived &&
              data &&
              data.entries.map((p) => {
                return (
                  <tr>
                    <td>{p.id}</td>
                    <td>{p.title}</td>
                    <td>
                      <div
                        className="s-badge"
                        style={
                          p.state === PriceListState.ACTIVE
                            ? { color: '#00a01a', borderColor: '#00a01a' }
                            : { color: '#5a5a5a', borderColor: '#5a5a5a' }
                        }
                      >
                        {p.state === PriceListState.ACTIVE
                          ? 'Активний'
                          : 'Неактивний'}
                      </div>
                    </td>
                    <td className="pl-icon-cell">
                      {openDropdownId === p.id && (
                        <div
                          className="pl-dropdown-menu"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button type="button" onClick={() => {}}>
                            Зробити активним
                          </button>
                          <button type="button" onClick={() => {}}>
                            Архівувати
                          </button>
                        </div>
                      )}
                      {p.state === PriceListState.INACTIVE && (
                        <img
                          src={`${import.meta.env.VITE_CDN_BASE_URL}/svg/dots.svg`}
                          alt="dots icon"
                          className="pl-dots-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown(p.id);
                          }}
                        />
                      )}
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

export default PriceLists;
