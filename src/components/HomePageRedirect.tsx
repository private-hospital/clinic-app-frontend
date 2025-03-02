import { Navigate } from 'react-router';
import { isClinicHead, isDoctor, isRegistrar } from '../service/authUtils';

const HomePageRedirect = () => {
  if (isDoctor()) return <Navigate to="/appointments" />;
  else if (isRegistrar()) return <Navigate to="/registry" />;
  else if (isClinicHead()) return <Navigate to="/statistics" />;
  return <Navigate to="/login" />;
};

export default HomePageRedirect;
