import '../styles/Header.css';
import {
  getAllowedPages,
  getImageOfUser,
  goToMainPage,
} from '../service/navigationUtils';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router';
import NavigationButton from './NavigationButton';

const Header = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)!;

  const handleLogout: () => void = () => {
    localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN_LS_KEY_NAME!);
    goToMainPage(navigate);
  };

  return (
    <header>
      <img
        src={import.meta.env.VITE_CDN_BASE_URL + '/svg/logo.svg'}
        className="header-logo-img"
        alt="Blue VitaLine Logo"
      />
      <div className="buttons-block">
        {getAllowedPages(authCtx).map((b) => {
          return <NavigationButton {...b} />;
        })}
      </div>
      <div className="info-block">
        <div className="user-info-block">
          <div className="image-circle">
            <img
              src={
                import.meta.env.VITE_CDN_BASE_URL +
                '/svg/' +
                getImageOfUser(authCtx)
              }
            />
          </div>
          <p className="user-name">Недашківська В.В.</p>
        </div>
        <img
          className="logout"
          src={import.meta.env.VITE_CDN_BASE_URL + '/svg/logout.svg'}
          onClick={handleLogout}
        />
      </div>
    </header>
  );
};

export default Header;
