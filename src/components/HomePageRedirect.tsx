import { Navigate } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const HomePageRedirect = () => {
  const authCtx = useContext(AuthContext);
  if (!authCtx || !authCtx.tokenPayload) {
    return <Navigate to="/login" />;
  } else if (authCtx.tokenPayload.role === 'DOCTOR') {
    return <Navigate to="/appointments" />;
  } else if (authCtx.tokenPayload.role === 'REGISTRAR') {
    return <Navigate to="/registry" />;
  } else if (authCtx.tokenPayload.role === 'CLINIC_HEAD') {
    return <Navigate to="/statistics" />;
  }
  return <Navigate to="/login" />;
};

export default HomePageRedirect;
