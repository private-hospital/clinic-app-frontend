import '../styles/NotFound.css';
import Button from '../components/Button';
import 'unfonts.css';
import { useNavigate } from 'react-router';
import { goToMainPage } from '../service/navigationUtils';
import { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';

const NotFound = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)!;

  return (
    <div className="full-page-box">
      <div className="centered-box">
        <img
          src={`${import.meta.env.VITE_CDN_BASE_URL}/jpg/Vector.jpg`}
          alt="Error 404 image"
        />
        <h5>Упс! Щось сталося!</h5>
        <p>Не вдалося знайти сторінку</p>
        <Button
          type="primary"
          text="Повернутися на головну сторінку"
          onClick={() => goToMainPage(navigate, authCtx.tokenPayload?.role)}
          isSubmit={false}
        />
      </div>
    </div>
  );
};

export default NotFound;
