import { useNavigate } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import { assertAuth } from '../service/navigationUtils';
import { UserRoles } from '../types/users';
import '../styles/authPages.css';
import Header from '../components/Header';
import { AppointmentStatuses } from '../types/appointments';
import Pagination from '../components/Pagination';
import {
  StatementFilterPropsDto,
  StatementRegistryDto,
  statementsTestData,
} from '../types/statements';
import '../styles/Statements.css';

const Statements = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)!;
  const [page, setPage] = useState(1);
  const [data, setData] = useState<StatementRegistryDto | null>(null);
  const [filterProps, setFilterProps] = useState<StatementFilterPropsDto>({
    sortBy: 'id',
    order: 'asc',
  });

  useEffect(() => {
    assertAuth(navigate, authCtx, [UserRoles.CLINIC_HEAD]);
  }, [navigate, authCtx]);

  useEffect(() => {
    setPage(1);
  }, [filterProps]);

  useEffect(() => {
    const perPage = 4;
    let filteredEntries = statementsTestData;

    if (filterProps.statuses && filterProps.statuses.length > 0) {
      filteredEntries = filteredEntries.filter((s) =>
        filterProps.statuses?.includes(s.status),
      );
    }

    if (filterProps.services && filterProps.services.length > 0) {
      filteredEntries = filteredEntries.filter((s) =>
        filterProps.services?.includes(s.service),
      );
    }

    filteredEntries.sort((a, b) => {
      const orderModifier = filterProps.order === 'asc' ? 1 : -1;
      if (filterProps.sortBy === 'id') {
        return (a.id - b.id) * orderModifier;
      } else if (filterProps.sortBy === 'service') {
        return a.service.localeCompare(b.service) * orderModifier;
      } else if (filterProps.sortBy === 'endDate') {
        const ad = a.endDate ?? 0;
        const bd = b.endDate ?? 0;
        return (ad - bd) * orderModifier;
      }
      return 0;
    });

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
  }, [page, filterProps]);

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
      <div className="s-registry-holder">
        <div className="s-controls-block">
          <h1 className="s-page-title">Відомості</h1>
          <div className="s-buttons-holder">
            {/*  TODO: Add filter button here */}
          </div>
        </div>
        <table className="s-registry-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Назва послуги</th>
              <th>ПІБ</th>
              <th>Сума (зі знижкою)</th>
              <th>Дата проведення</th>
              <th>Дата виконання</th>
              <th>Стан виконання</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.entries.map((p) => {
                return (
                  <tr>
                    <td>{p.id}</td>
                    <td>{p.service}</td>
                    <td>{p.patientName}</td>
                    <td>{p.total}</td>
                    <td>{formatDate(p.appointmentDate)}</td>
                    <td>{p.endDate ? formatDate(p.endDate) : '-'}</td>
                    <td>
                      <div
                        className="s-badge"
                        style={
                          p.status === AppointmentStatuses.COMPLETED
                            ? { borderColor: '#00B11D', color: '#00B11D' }
                            : p.status === AppointmentStatuses.PLANNED
                              ? { borderColor: '#4699e6', color: '#4699e6' }
                              : { borderColor: '#C70000', color: '#C70000' }
                        }
                      >
                        {p.status === AppointmentStatuses.COMPLETED
                          ? 'Виконано'
                          : p.status === AppointmentStatuses.PLANNED
                            ? 'Заплановано'
                            : 'Скасовано'}
                      </div>
                    </td>
                    {/*<td>*/}
                    {/*  {status === AppointmentStatuses.PLANNED && (*/}
                    {/*    <Button*/}
                    {/*      type={*/}
                    {/*        new Date() > new Date(p.appointmentDate)*/}
                    {/*          ? 'primary'*/}
                    {/*          : 'secondary'*/}
                    {/*      }*/}
                    {/*      text="Завершити огляд / процедуру"*/}
                    {/*      isSubmit={false}*/}
                    {/*      disabled={new Date() < new Date(p.appointmentDate)}*/}
                    {/*      css={{*/}
                    {/*        width: 'fit-content',*/}
                    {/*        fontSize: '1rem',*/}
                    {/*        height: '2.7rem',*/}
                    {/*        paddingLeft: '2rem',*/}
                    {/*        paddingRight: '2rem',*/}
                    {/*        fontWeight: 300,*/}
                    {/*      }}*/}
                    {/*      onClick={() =>*/}
                    {/*        toast.success('Надання послуги успішно завершено')*/}
                    {/*      }*/}
                    {/*    />*/}
                    {/*  )}*/}
                    {/*</td>*/}
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

export default Statements;
