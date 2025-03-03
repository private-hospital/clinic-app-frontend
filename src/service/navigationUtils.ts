import { NavigateFunction } from 'react-router';
import { UserRoles } from '../types/users';

export const goToMainPage = (navigate: NavigateFunction, role?: UserRoles) => {
  if (role === 'DOCTOR') navigate('/appointments');
  else if (role === 'REGISTRAR') navigate('/registry');
  else if (role === 'CLINIC_HEAD') navigate('/statistics');
  else navigate('/login');
};
