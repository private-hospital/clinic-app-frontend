import { NavigateFunction } from 'react-router';
import { UserRoles } from '../types/users';
import { AuthContextType } from '../components/AuthContext';
import { NavigationButtonProps } from '../types/NavigationButtonProps';

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

export const getImageOfUser = (
  ctx: AuthContextType,
): 'doctor.svg' | 'manager.svg' | 'register.svg' => {
  if (ctx?.tokenPayload?.role === UserRoles.DOCTOR) return 'doctor.svg';
  if (ctx?.tokenPayload?.role === UserRoles.CLINIC_HEAD) return 'manager.svg';
  return 'register.svg';
};

export const getAllowedPages = (
  ctx: AuthContextType,
): NavigationButtonProps[] => {
  if (ctx?.tokenPayload?.role === UserRoles.DOCTOR) {
    return [
      {
        display: 'Реєстр пацієнтів',
        greyIconPath:
          import.meta.env.VITE_CDN_BASE_URL + '/svg/patient-register-grey.svg',
        whiteIconPath:
          import.meta.env.VITE_CDN_BASE_URL + '/svg/patient-register-white.svg',
        path: '/registry',
      },
      {
        display: 'Заплановані огляди',
        greyIconPath:
          import.meta.env.VITE_CDN_BASE_URL +
          '/svg/planned-inspections-grey.svg',
        whiteIconPath:
          import.meta.env.VITE_CDN_BASE_URL +
          '/svg/planned-inspections-white.svg',
        path: '/appointments',
      },
    ];
  }
  if (ctx?.tokenPayload?.role === UserRoles.REGISTRAR) {
    return [
      {
        display: 'Реєстр пацієнтів',
        greyIconPath:
          import.meta.env.VITE_CDN_BASE_URL + '/svg/patient-register-grey.svg',
        whiteIconPath:
          import.meta.env.VITE_CDN_BASE_URL + '/svg/patient-register-white.svg',
        path: '/registry',
      },
    ];
  }
  return [
    {
      display: 'Статистика',
      greyIconPath:
        import.meta.env.VITE_CDN_BASE_URL + '/svg/statistics-grey.svg',
      whiteIconPath:
        import.meta.env.VITE_CDN_BASE_URL + '/svg/statistics-white.svg',
      path: '/statistics',
    },
    {
      display: 'Прайс-листи',
      greyIconPath:
        import.meta.env.VITE_CDN_BASE_URL + '/svg/price-list-grey.svg',
      whiteIconPath:
        import.meta.env.VITE_CDN_BASE_URL + '/svg/price-list-white.svg',
      path: '/price-lists',
    },
    {
      display: 'Відомості',
      greyIconPath: import.meta.env.VITE_CDN_BASE_URL + '/svg/data-grey.svg',
      whiteIconPath: import.meta.env.VITE_CDN_BASE_URL + '/svg/data-white.svg',
      path: '/statements',
    },
  ];
};
