import { useContext, useEffect } from 'react';
import { AuthContext } from '../components/AuthContext';
import { assertAuth } from '../service/navigationUtils';
import { useNavigate } from 'react-router';
import { UserRoles } from '../types/users';

const RegistryPage = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)!;
  useEffect(() => {
    assertAuth(navigate, authCtx, [UserRoles.REGISTRAR, UserRoles.DOCTOR]);
  }, [navigate, authCtx]);
  return <h1>Registry Page</h1>;
};

export default RegistryPage;
