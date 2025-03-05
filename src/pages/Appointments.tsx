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
  appointmentsTestData,
} from '../types/appointments';
import Button from '../components/Button';
import { toast } from 'react-toastify';

const Appointments = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(AppointmentStatuses.PLANNED);
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
    const perPage = 4;
    const filteredEntries = appointmentsTestData.filter(
      (a) => a.status === status,
    );
    const totalPages = Math.ceil(filteredEntries.length / perPage);
    const startIndex = (page - 1) * perPage;
    const pageEntries = filteredEntries.slice(startIndex, startIndex + perPage);

    console.log(filteredEntries);

    setData({
      totalPages,
      perPage,
      page,
      entries: pageEntries,
    });
  }, [status, page]);

  const formatDate = (ts: number): string => {
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
                return (
                  <tr>
                    <td>{p.patientName}</td>
                    <td>{p.service}</td>
                    <td>{formatDate(p.appointmentDate).substring(0, 10)}</td>
                    <td>{formatDate(p.appointmentDate).substring(10)}</td>
                    <td>
                      {status === AppointmentStatuses.PLANNED && (
                        <Button
                          type={
                            new Date() > new Date(p.appointmentDate)
                              ? 'primary'
                              : 'secondary'
                          }
                          text="Завершити огляд / процедуру"
                          isSubmit={false}
                          disabled={new Date() < new Date(p.appointmentDate)}
                          css={{
                            width: 'fit-content',
                            fontSize: '1rem',
                            height: '2.7rem',
                            paddingLeft: '2rem',
                            paddingRight: '2rem',
                            fontWeight: 300,
                          }}
                          onClick={() =>
                            toast.success('Надання послуги успішно завершено')
                          }
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
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
