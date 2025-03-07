import { useNavigate } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import { assertAuth } from '../service/navigationUtils';
import { UserRoles } from '../types/users';
import Header from '../components/Header';
import '../styles/authPages.css';
import Select from '../components/Select';
import Pagination from '../components/Pagination';
import { PriceListRegistryDto, PriceListState } from '../types/priceLists';
import '../styles/PriceLists.css';
import PriceListForm from '../components/PriceListForm';
import { ServiceRegistryDto } from '../types/services';
import Button from '../components/Button';
import { toast } from 'react-toastify';
import ServiceForm from '../components/ServiceForm';
import ArchivePriceListForm from '../components/ArchivePriceListForm';
import api from '../service/axiosUtils';
import { StatusResponseDto } from '../types/common';

const PriceLists = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)!;
  const [pagePL, setPagePL] = useState<number>(1);
  const [pageS, setPageS] = useState<number>(1);
  const [isArchived, setIsArchived] = useState(false);
  const [plData, setPLData] = useState<PriceListRegistryDto | null>(null);
  const [sData, setSData] = useState<ServiceRegistryDto | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [isPLFormOpen, setIsPLFormOpen] = useState(false);
  const [isSFormOpen, setIsSFormOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [archivePLId, setArchivePLId] = useState<number | null>(null);

  const handleArchivePL = (id: number): void => {
    setArchivePLId(id);
    setIsArchiveModalOpen(true);
  };

  const archivePriceList = async (reason: string) => {
    if (archivePLId == null) return;
    try {
      await api.put<StatusResponseDto, { reason: string }>(
        `/owner/price-lists?id=${archivePLId}`,
        { reason },
      );
      toast.success('Прайс лист був успішно архівований');
      setIsArchiveModalOpen(false);
    } catch (e) {
      console.log(e);
      toast.error('Не вдалось архівувати прайс лист');
    }
  };

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
    setPagePL(1);
  }, [isArchived]);

  const fetchPriceLists = async () => {
    try {
      const response = await api.get<PriceListRegistryDto>(
        `/owner/price-lists?p=${pagePL}&q=10&a=${isArchived}`,
      );
      console.log(response);
      setPLData(response);
    } catch (e) {
      console.log(e);
      toast.error('Не вдалось завантажити прайс листи');
    }
  };

  useEffect(() => {
    fetchPriceLists();
  }, [
    pagePL,
    isArchived,
    isArchiveModalOpen,
    openDropdownId,
    isPLFormOpen,
    setPLData,
  ]);

  const fetchServices = async () => {
    try {
      const response = await api.get<ServiceRegistryDto>(
        `/owner/services?p=${pageS}&q=10`,
      );
      console.log(response);
      setSData(response);
    } catch (e) {
      console.log(e);
      toast.error('Не вдалось завантажити послуги');
    }
  };

  useEffect(() => {
    fetchServices();
  }, [pageS, plData, isSFormOpen, setSData]);

  const handleUnarchive = async (id: number): Promise<void> => {
    try {
      await api.put<StatusResponseDto, object>(`/owner/services?id=${id}`, {});
      console.log(id);
      toast.success('Послугу було успішно актуалізовано');
      fetchServices();
    } catch (e) {
      console.log(e);
      toast.error('Не вдалось актуалізувати послугу');
    }
  };

  const handleArchive = async (id: number): Promise<void> => {
    try {
      await api.delete(`/owner/services?id=${id}`);
      toast.success('Послугу було успішно архівовано');
      fetchServices();
    } catch (e) {
      console.log(e);
      toast.error('Не вдалось архівувати послугу');
    }
  };

  const handleMakePLActive = async (id: number): Promise<void> => {
    try {
      await api.post<StatusResponseDto, null>(
        `/owner/price-lists/active?id=${id}`,
        null,
      );
      toast.success('Прайс лист був успішно активований');
      toggleDropdown(id);
    } catch (e) {
      console.log(e);
      toast.error('Не вдалось активувати прайс лист');
    }
  };

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
      <PriceListForm
        isOpen={isPLFormOpen}
        onClose={() => setIsPLFormOpen(false)}
      />
      <ArchivePriceListForm
        isOpen={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
        onArchive={archivePriceList}
      />
      <ServiceForm isOpen={isSFormOpen} onClose={() => setIsSFormOpen(false)} />
      <div className="a-registry-holder">
        <div className="a-controls-block">
          <h1 className="a-page-title">Прайс-листи</h1>
          <div className="a-buttons-holder">
            {!isArchived && (
              <button
                className="pl-add-btn"
                onClick={() => setIsPLFormOpen(true)}
              >
                <span
                  style={{
                    fontSize: '1.5rem',
                    marginRight: '0.8rem',
                    fontWeight: 200,
                  }}
                >
                  +
                </span>
                Створити прайс-лист
              </button>
            )}
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
        <table className="pl-registry-table">
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
              plData &&
              plData.entries.map((p) => {
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
              plData &&
              plData.entries.map((p) => {
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
                          <button
                            type="button"
                            onClick={() => handleMakePLActive(p.id)}
                          >
                            Зробити активним
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              handleArchivePL(p.id);
                              toggleDropdown(p.id);
                            }}
                          >
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
        {(!plData || plData.entries.length === 0) && (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>
            Немає записів
          </p>
        )}
        <Pagination
          setPage={setPagePL}
          page={pagePL}
          totalPages={plData ? plData.totalPages : 1}
        />
      </div>

      <div className="a-registry-holder">
        <div className="a-controls-block">
          <h1 className="a-page-title">Послуги клініки</h1>
          <div className="a-buttons-holder">
            <button className="pl-add-btn" onClick={() => setIsSFormOpen(true)}>
              <span
                style={{
                  fontSize: '1.5rem',
                  marginRight: '0.8rem',
                  fontWeight: 200,
                }}
              >
                +
              </span>
              Додати послугу
            </button>
          </div>
        </div>
        <table className="pl-registry-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Назва</th>
              <th>Вартість, грн</th>
              <th>Надано (разів)</th>
              <th>Архівовано</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sData &&
              sData.entries.map((p) => {
                return (
                  <tr>
                    <td>{p.id}</td>
                    <td>{p.title}</td>
                    <td>{p.isArchived ? '-' : p.price}</td>
                    <td>{p.count}</td>
                    <td>
                      <div
                        className="s-badge"
                        style={
                          p.isArchived
                            ? { color: '#5a5a5a', borderColor: '#5a5a5a' }
                            : { color: '#00a01a', borderColor: '#00a01a' }
                        }
                      >
                        {p.isArchived ? 'Так' : 'Ні'}
                      </div>
                    </td>
                    <td>
                      {p.isArchived && (
                        <Button
                          type="primary"
                          text="Дістати з архіву"
                          isSubmit={false}
                          onClick={() => handleUnarchive(p.id)}
                          css={{
                            width: '100%',
                            height: '3rem',
                            fontSize: '1rem',
                            fontWeight: 300,
                          }}
                        />
                      )}
                      {!p.isArchived && (
                        <Button
                          type="primary"
                          text="Архівувати"
                          isSubmit={false}
                          onClick={() => handleArchive(p.id)}
                          css={{
                            width: '100%',
                            height: '3rem',
                            fontSize: '1rem',
                            fontWeight: 300,
                            backgroundColor: '#c70000',
                          }}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {(!sData || sData.entries.length === 0) && (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>
            Немає записів
          </p>
        )}
        <Pagination
          setPage={setPageS}
          page={pageS}
          totalPages={sData ? sData.totalPages : 1}
        />
      </div>
    </div>
  );
};

export default PriceLists;
