import '../styles/NotFound.css';
import Button from '../components/Button';
import 'unfonts.css';
import { useNavigate } from 'react-router';
import { isClinicHead, isDoctor, isRegistrar } from '../service/authUtils';

const NotFound = () => {
  const navigate = useNavigate();

  const goToMainPageHandler: () => void = () => {
    if (isDoctor()) navigate('/appointments');
    else if (isRegistrar()) navigate('/registry');
    else if (isClinicHead()) navigate('/statistics');
    else navigate('/login');
  };

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
          onClick={goToMainPageHandler}
          isSubmit={false}
        />
      </div>
    </div>
  );
};

export default NotFound;
