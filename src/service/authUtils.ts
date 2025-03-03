import { jwtDecode } from 'jwt-decode';
import { DecodedJwt, JwtPayload } from '../types/jwt';

export const getTokenPayload = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<DecodedJwt>(token.substring(7)).sub;
  } catch (e) {
    console.log(e);
    localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN_LS_KEY_NAME!);
  }
  return null;
};
