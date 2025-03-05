import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import { assertAuth } from '../service/navigationUtils';
import { useNavigate } from 'react-router';
import { UserRoles } from '../types/users';
import Header from '../components/Header';
import '../styles/authPages.css';
import '../styles/RegistryPage.css';
import { PatientsRegistryDto, patientsTestData } from '../types/patients';
import Pagination from '../components/Pagination';
import PatientRegistrationForm from '../components/PatientRegistrationForm';

const RegistryPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)!;
  useEffect(() => {
    assertAuth(navigate, authCtx, [UserRoles.REGISTRAR, UserRoles.DOCTOR]);
  }, [navigate, authCtx]);

  const handleSearchBarChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    console.log(e.target.value);
  };

  const [page, setPage] = useState(1);
  const [data, setData] = useState<PatientsRegistryDto | null>(null);
  const fetchData = (): PatientsRegistryDto => {
    if (page === 1) {
      return {
        entries: patientsTestData.slice(0, 10),
        page: 1,
        perPage: 10,
        totalPages: 4,
      };
    }
    if (page === 2) {
      return {
        entries: patientsTestData.slice(10, 20),
        page: 2,
        perPage: 10,
        totalPages: 4,
      };
    }
    if (page === 3) {
      return {
        entries: patientsTestData.slice(20, 30),
        page: 3,
        perPage: 10,
        totalPages: 4,
      };
    }
    if (page === 4) {
      return {
        entries: patientsTestData.slice(30, 36),
        page: 4,
        perPage: 10,
        totalPages: 4,
      };
    }
    return {
      entries: [],
      page: 1,
      perPage: 0,
      totalPages: 1,
    };
  };

  const formatDate = (ts: number): string => {
    const date = new Date(ts);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  useEffect(() => {
    setData(fetchData);
  }, [page, setData]);

  return (
    <div className="auth-body">
      <Header />
      <PatientRegistrationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
      <div className="registry-holder">
        <div className="controls-block">
          <h1 className="page-title">Реєстр пацієнтів</h1>
          <div className="buttons-holder">
            <div className="search-box">
              <img
                src={
                  import.meta.env.VITE_CDN_BASE_URL +
                  '/svg/magnifying-glass.svg'
                }
                alt="Search"
              />
              <input
                type="text"
                onChange={handleSearchBarChange}
                className="search-input"
                placeholder="Пошук"
              />
            </div>
            {authCtx.tokenPayload?.role === UserRoles.REGISTRAR && (
              <button className="add-btn" onClick={() => setIsFormOpen(true)}>
                <span
                  style={{
                    fontSize: '1.5rem',
                    marginRight: '0.8rem',
                    fontWeight: 200,
                  }}
                >
                  +
                </span>{' '}
                Додати пацієнта
              </button>
            )}
          </div>
        </div>
        <table className="registry-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>ПІБ</th>
              <th>Номер телефону</th>
              <th>Електронна пошта</th>
              <th>Дата народження</th>
              <th>Стать</th>
              <th>Пільга</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.entries.map((p) => {
                return (
                  <tr onClick={() => navigate(`/patient/${p.id}`)}>
                    <td>{p.id}</td>
                    <td>{p.fullname}</td>
                    <td>{p.phone}</td>
                    <td>{p.email}</td>
                    <td>{formatDate(p.dob)}</td>
                    <td>{p.sex}</td>
                    <td>{p.benefit}</td>
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

export default RegistryPage;
