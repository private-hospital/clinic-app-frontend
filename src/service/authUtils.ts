import { jwtDecode } from 'jwt-decode';
import { DecodedJwt, JwtPayload } from '../types/jwt';
import { UserRoles } from '../types/users';

export const getTokenPayload: () => JwtPayload | null = () => {
  try {
    const token: string | null = localStorage.getItem(
      import.meta.env.VITE_CDN_BASE_URL,
    );
    return jwtDecode<DecodedJwt>(token!).sub;
  } catch (e) {
    console.log(e);
    localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN_LS_KEY_NAME);
  }
  return null;
};

export const isAuthenticated: () => boolean = () => {
  return !!getTokenPayload();
};

export const isDoctor: () => boolean = () => {
  if (!isAuthenticated()) {
    return false;
  }
  return getTokenPayload()!.role === UserRoles.DOCTOR;
};

export const isRegistrar: () => boolean = () => {
  if (!isAuthenticated()) {
    return false;
  }
  return getTokenPayload()!.role === UserRoles.REGISTRAR;
};

export const isClinicHead: () => boolean = () => {
  if (!isAuthenticated()) {
    return false;
  }
  return getTokenPayload()!.role === UserRoles.CLINIC_HEAD;
};
