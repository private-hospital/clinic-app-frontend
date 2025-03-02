import { UserRoles } from './users';

export interface DecodedJwt {
  iat: number;
  exp: number;
  sub: JwtPayload;
}

export interface JwtPayload {
  id: number;
  role: UserRoles;
}
