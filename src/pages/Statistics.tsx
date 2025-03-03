import { useNavigate } from 'react-router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../components/AuthContext';
import { assertAuth } from '../service/navigationUtils';
import { UserRoles } from '../types/users';

const Statistics = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)!;
  useEffect(() => {
    assertAuth(navigate, authCtx, [UserRoles.CLINIC_HEAD]);
  }, [navigate, authCtx]);
  return <h1>Statistics</h1>;
};

export default Statistics;
