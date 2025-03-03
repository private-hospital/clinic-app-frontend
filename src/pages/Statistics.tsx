import { useNavigate } from 'react-router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../components/AuthContext';
import { assertAuth } from '../service/navigationUtils';
import { UserRoles } from '../types/users';
import '../styles/authPages.css';
import Header from '../components/Header';

const Statistics = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)!;
  useEffect(() => {
    assertAuth(navigate, authCtx, [UserRoles.CLINIC_HEAD]);
  }, [navigate, authCtx]);
  return (
    <div className="auth-body">
      <Header />
    </div>
  );
};

export default Statistics;
