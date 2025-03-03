import { NavigationButtonProps } from '../types/NavigationButtonProps';
import '../styles/NavigationButton.css';
import { useLocation, useNavigate } from 'react-router';

const NavigationButton = (p: NavigationButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === p.path;

  return (
    <div
      onClick={() => navigate(p.path)}
      className={'link-holder' + (isActive ? ' selected' : '')}
    >
      <img
        src={isActive ? p.whiteIconPath : p.greyIconPath}
        className="icon-style"
      />
      <p className={'text-style' + (isActive ? ' selected' : '')}>
        {p.display}
      </p>
    </div>
  );
};

export default NavigationButton;
