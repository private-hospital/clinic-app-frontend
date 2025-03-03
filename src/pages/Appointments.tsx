import { useNavigate } from 'react-router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../components/AuthContext';
import { assertAuth } from '../service/navigationUtils';
import { UserRoles } from '../types/users';

const Appointments = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)!;
  useEffect(() => {
    assertAuth(navigate, authCtx, [UserRoles.DOCTOR]);
  }, [navigate, authCtx]);
  return <h1>Appointments</h1>;
};

export default Appointments;
