import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../components/AuthContext';
import { assertAuth } from '../service/navigationUtils';
import { useNavigate } from 'react-router';
import { UserRoles } from '../types/users';
import Header from '../components/Header';
import '../styles/authPages.css';
import '../styles/RegistryPage.css';

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
      </div>
    </div>
  );
};

export default RegistryPage;
