import { useNavigate } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import { assertAuth } from '../service/navigationUtils';
import { UserRoles } from '../types/users';
import Header from '../components/Header';
import '../styles/authPages.css';
import Pagination from '../components/Pagination';
import '../styles/Appointments.css';
import Select from '../components/Select';
import {
  AppointmentsRegistryDto,
  AppointmentStatuses,
} from '../types/appointments';
import Button from '../components/Button';
import { toast } from 'react-toastify';
import api from '../service/axiosUtils';

const Appointments = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<AppointmentStatuses>(
    AppointmentStatuses.PLANNED,
  );
  const [data, setData] = useState<AppointmentsRegistryDto | null>(null);

  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)!;

  useEffect(() => {
    assertAuth(navigate, authCtx, [UserRoles.DOCTOR]);
  }, [navigate, authCtx]);

  useEffect(() => {
    setPage(1);
  }, [status]);

  useEffect(() => {
    fetchAppointments();
  }, [page, status]);

  const fetchAppointments = async () => {
    try {
      const response = await api.get<AppointmentsRegistryDto>(
        `/doctor/appointments?p=${page}&q=10&status=${status}`,
      );
      setData(response);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Не вдалось завантажити список записів');
    }
  };

  const completeAppointment = async (appointmentId: number) => {
    try {
      await api.post<unknown, null>(
        `/doctor/appointments?id=${appointmentId}`,
        null,
      );
      toast.success('Огляд / процедуру завершено');
      fetchAppointments();
    } catch (error) {
      console.error('Error completing appointment:', error);
      toast.error('Не вдалось завершити послугу');
    }
  };

  const formatDate = (ts: number): string => {
    if (!ts) return '-';
    const date = new Date(ts);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, '0');
    const mins = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hour}:${mins}`;
  };

  return (
    <div className="auth-body">
      <Header />
      <div className="a-registry-holder">
        <div className="a-controls-block">
          <h1 className="a-page-title">Заплановані огляди</h1>
          <div className="a-buttons-holder">
            <Select
              label=""
              selectId="appointment-status"
              onChange={(e) => setStatus(e.target.value as AppointmentStatuses)}
              options={[
                {
                  label: 'Заплановані',
                  value: AppointmentStatuses.PLANNED,
                },
                {
                  label: 'Скасовані',
                  value: AppointmentStatuses.CANCELED,
                },
                {
                  label: 'Завершені',
                  value: AppointmentStatuses.COMPLETED,
                },
              ]}
              css={{ fontSize: '1rem', height: '3rem' }}
            />
          </div>
        </div>
        <table className="a-registry-table">
          <thead>
            <tr>
              <th>ПІБ</th>
              <th>Назва послуги</th>
              <th>Дата проведення</th>
              <th>Час проведення</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.entries.map((p) => {
                const fullDateTime = formatDate(p.appointmentDate);
                const datePart = fullDateTime.substring(0, 10);
                const timePart = fullDateTime.substring(11);

                return (
                  <tr key={p.id}>
                    <td>{p.patientName}</td>
                    <td>{p.service}</td>
                    <td>{datePart}</td>
                    <td>{timePart}</td>
                    <td>
                      {status === AppointmentStatuses.PLANNED && (
                        <Button
                          type={
                            new Date().getTime() > p.appointmentDate
                              ? 'primary'
                              : 'secondary'
                          }
                          text="Завершити огляд / процедуру"
                          isSubmit={false}
                          disabled={new Date().getTime() < p.appointmentDate}
                          css={{
                            width: 'fit-content',
                            fontSize: '1rem',
                            height: '2.7rem',
                            paddingLeft: '2rem',
                            paddingRight: '2rem',
                            fontWeight: 300,
                          }}
                          onClick={() => completeAppointment(p.id)}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {(!data || data.entries.length === 0) && (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>
            Немає записів
          </p>
        )}
        <Pagination
          setPage={setPage}
          page={page}
          totalPages={data ? data.totalPages : 1}
        />
      </div>
    </div>
  );
};

export default Appointments;
