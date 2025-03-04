import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import { assertAuth } from '../service/navigationUtils';
import { useNavigate } from 'react-router';
import { UserRoles } from '../types/users';
import Header from '../components/Header';
import '../styles/authPages.css';
import '../styles/RegistryPage.css';
import {
  PatientsRegistryDto,
  PatientsRegistryEntryDto,
  patientsTestData,
} from '../types/patients';

const RegistryPage = () => {
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
  const [data, setData] = useState<PatientsRegistryEntryDto[]>([]);
  const fetchData = (): PatientsRegistryDto => {
    if (page === 1) {
      return {
        entries: patientsTestData.slice(0, 3),
        page: 1,
        perPage: 9,
        totalPages: 3,
      };
    }
    if (page === 2) {
      return {
        entries: patientsTestData.slice(3, 6),
        page: 1,
        perPage: 3,
        totalPages: 3,
      };
    }
    return {
      entries: patientsTestData.slice(6, 8),
      page: 1,
      perPage: 3,
      totalPages: 3,
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
    setData(fetchData().entries);
  }, [data, setData, page, setPage, fetchData]);

  return (
    <div className="auth-body">
      <Header />
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
            <button className="add-btn">
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
            {data.map((p) => {
              return (
                <tr>
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
      </div>
    </div>
  );
};

export default RegistryPage;
