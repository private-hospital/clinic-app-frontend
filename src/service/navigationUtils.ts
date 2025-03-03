import { NavigateFunction } from 'react-router';
import { UserRoles } from '../types/users';
import { AuthContextType } from '../components/AuthContext';

export const goToMainPage = (navigate: NavigateFunction, role?: UserRoles) => {
  if (role === 'DOCTOR') navigate('/appointments');
  else if (role === 'REGISTRAR') navigate('/registry');
  else if (role === 'CLINIC_HEAD') navigate('/statistics');
  else navigate('/login');
};

export const assertAuth = (
  navigate: NavigateFunction,
  ctx: AuthContextType,
  oneOf: UserRoles[],
): void => {
  if (!oneOf.find((r) => r === ctx.tokenPayload?.role)) {
    goToMainPage(navigate, ctx.tokenPayload?.role);
  }
};
