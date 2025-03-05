import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import { assertAuth } from '../service/navigationUtils';
import { useNavigate } from 'react-router';
import { UserRoles } from '../types/users';
import Header from '../components/Header';
import '../styles/authPages.css';
import '../styles/RegistryPage.css';
import { PatientsRegistryDto } from '../types/patients';
import Pagination from '../components/Pagination';
import PatientRegistrationForm from '../components/PatientRegistrationForm';
import api from '../service/axiosUtils';

const RegistryPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [data, setData] = useState<PatientsRegistryDto | null>(null);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)!;

  useEffect(() => {
    assertAuth(navigate, authCtx, [UserRoles.REGISTRAR, UserRoles.DOCTOR]);
  }, [navigate, authCtx]);

  const handleSearchBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await api.get<PatientsRegistryDto>(
        `/public/registry?p=${page}&q=10`,
      );
      console.log(response);
      setData(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, isFormOpen]);

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
                  <tr onClick={() => navigate(`/patient/${p.id}`)} key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.fullname}</td>
                    <td>{p.phone}</td>
                    <td>{p.email}</td>
                    <td>{p.dob}</td>
                    <td>{p.sex}</td>
                    <td>{p.benefit}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
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
