import { useNavigate, useParams } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import { assertAuth } from '../service/navigationUtils';
import { UserRoles } from '../types/users';
import Header from '../components/Header';
import '../styles/authPages.css';
import '../styles/PatientPage.css';
import {
  PatientEditFormData,
  patientEditSchema,
  PatientsRegistryEntryDto,
  patientsTestData,
} from '../types/patients';
import { RouteParams } from '../types/common';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import { appointmentsTestData } from '../types/appointments';
import {
  MedicalCardRecordDto,
  medicalCardRecordsTestData,
} from '../types/cardRecords';

const PatientPage = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)!;
  const { id: ids } = useParams<RouteParams>();
  const id = Number(ids);
  const [p, setP] = useState<PatientsRegistryEntryDto | undefined>(undefined);

  useEffect(() => {
    assertAuth(navigate, authCtx, [UserRoles.REGISTRAR, UserRoles.DOCTOR]);
  }, [navigate, authCtx]);

  useEffect(() => {
    setP(patientsTestData.find((p) => p.id === id));
  }, [setP, id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PatientEditFormData>({
    resolver: zodResolver(patientEditSchema),
    reValidateMode: 'onSubmit',
    mode: 'onSubmit',
    defaultValues: {
      lastName: p?.fullname.split(' ')[0] || '',
      firstName: p?.fullname.split(' ')[1] || '',
      middleName: p?.fullname.split(' ')[2] || '',
      phone: p?.phone || '',
      email: p?.email || '',
      dob: p?.dob
        ? new Date(p.dob).toISOString().slice(0, 10)
        : new Date(2000, 0, 1).toISOString().slice(0, 10),
      sex: p?.sex === 'FEMALE' ? 'FEMALE' : 'MALE',
    },
  });

  useEffect(() => {
    if (p) {
      reset({
        lastName: p?.fullname.split(' ')[0] || '',
        firstName: p?.fullname.split(' ')[1] || '',
        middleName: p?.fullname.split(' ')[2] || '',
        phone: p?.phone || '',
        email: p?.email || '',
        dob: p?.dob
          ? new Date(p.dob).toISOString().slice(0, 10)
          : new Date(2000, 0, 1).toISOString().slice(0, 10),
        sex: p?.sex === 'FEMALE' ? 'FEMALE' : 'MALE',
      });
    }
  }, [p, reset]);

  const onSubmit = (data: PatientEditFormData) => {
    console.log('Form data:', data);
    toast.success('Пацієнта збережено');
  };

  const formatDate = (timestamp: number): string => {
    const dateObj = new Date(timestamp);

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const getTypeLabel = (type: MedicalCardRecordDto['type']) => {
    switch (type) {
      case 'DIAGNOSIS':
        return 'Діагноз';
      case 'ANALYSIS_RESULTS':
        return 'Результати аналізів';
      case 'NECESSARY_EXAMINATIONS':
        return 'Направлення на обстеження';
      default:
        return '';
    }
  };

  return (
    <div className="auth-body">
      <Header />
      <div className="data-holder">
        <h1 className="page-title">Медична картка пацієнта</h1>
        <div className="pat-info-block">
          <div className="sub-info-block">
            <h3>Особисті дані пацієнта</h3>
            {p ? (
              <form
                className="patient-edit-form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <Input
                  type="text"
                  label="Прізвище"
                  inputId="lastName"
                  placeholder="Іванов"
                  error={errors.lastName?.message}
                  disabled={authCtx.tokenPayload?.role === UserRoles.DOCTOR}
                  register={register('lastName')}
                  css={
                    errors.lastName?.message ? {} : { backgroundColor: 'white' }
                  }
                />

                <Input
                  type="text"
                  label="Ім’я"
                  inputId="firstName"
                  placeholder="Іван"
                  error={errors.firstName?.message}
                  disabled={authCtx.tokenPayload?.role === UserRoles.DOCTOR}
                  register={register('firstName')}
                  css={
                    errors.firstName?.message
                      ? {}
                      : { backgroundColor: 'white' }
                  }
                />

                <Input
                  type="text"
                  label="По батькові"
                  inputId="middleName"
                  placeholder="Іванович"
                  error={errors.middleName?.message}
                  disabled={authCtx.tokenPayload?.role === UserRoles.DOCTOR}
                  register={register('middleName')}
                  css={
                    errors.middleName?.message
                      ? {}
                      : { backgroundColor: 'white' }
                  }
                />

                <Input
                  type="phone"
                  label="Номер телефону"
                  inputId="phone"
                  placeholder="+380501112233"
                  error={errors.phone?.message}
                  register={register('phone')}
                  disabled={true}
                  css={
                    errors.phone?.message ? {} : { backgroundColor: 'white' }
                  }
                />

                <Input
                  type="email"
                  label="Електронна пошта"
                  inputId="email"
                  placeholder="example@vitalineph.com"
                  error={errors.email?.message}
                  disabled={authCtx.tokenPayload?.role === UserRoles.DOCTOR}
                  register={register('email')}
                  css={
                    errors.email?.message ? {} : { backgroundColor: 'white' }
                  }
                />

                <Input
                  type="date"
                  label="Дата народження"
                  inputId="dob"
                  placeholder="12.02.2000"
                  error={errors.dob?.message}
                  register={register('dob')}
                  disabled={true}
                  css={errors.dob?.message ? {} : { backgroundColor: 'white' }}
                />

                <Select
                  label="Стать"
                  selectId="sex"
                  error={errors.sex?.message}
                  disabled={authCtx.tokenPayload?.role === UserRoles.DOCTOR}
                  register={register('sex')}
                  options={[
                    { label: 'Чоловік', value: 'MALE' },
                    { label: 'Жінка', value: 'FEMALE' },
                  ]}
                  css={errors.sex?.message ? {} : { backgroundColor: 'white' }}
                />

                {authCtx.tokenPayload?.role === UserRoles.REGISTRAR && (
                  <Button
                    type="primary"
                    text="Зберегти"
                    isSubmit={true}
                    css={{
                      width: 'fit-content',
                      fontSize: '1.3rem',
                      fontWeight: 300,
                      paddingLeft: '3rem',
                      paddingRight: '3rem',
                      height: '3.2rem',
                    }}
                  />
                )}
              </form>
            ) : (
              <p>Завантаження даних пацієнта...</p>
            )}
          </div>
          <div className="sub-info-block">
            <div className="directions-block">
              <h3>Візити до лікаря</h3>

              <div className="visits-list">
                {appointmentsTestData?.length ? (
                  appointmentsTestData.map((a, index) => (
                    <div className="visit-card" key={index}>
                      <Input
                        type="text"
                        label="Назва послуги"
                        placeholder=""
                        inputId={`serviceName-${index}`}
                        value={a.service}
                        disabled={true}
                        css={{
                          color: 'black',
                          fontWeight: 200,
                          fontSize: '1.2rem',
                        }}
                      />
                      <Input
                        type="text"
                        label="Дата прийому"
                        placeholder=""
                        inputId={`aDate-${index}`}
                        value={formatDate(a.appointmentDate)}
                        disabled={true}
                        css={{
                          color: 'black',
                          fontWeight: 200,
                          fontSize: '1.2rem',
                        }}
                      />
                      <Input
                        type="text"
                        label="Статус прийому"
                        placeholder=""
                        inputId={`status-${index}`}
                        value={a.status}
                        disabled={true}
                        css={{
                          color:
                            a.status === 'Завершений'
                              ? '#00b11d'
                              : a.status === 'Запланований'
                                ? '#4699e6'
                                : '#c70000',
                          fontWeight: 200,
                          fontSize: '1.2rem',
                        }}
                      />
                      <Input
                        type="text"
                        label="Вартість послуг, грн"
                        placeholder=""
                        inputId={`price-${index}`}
                        value={a.price?.toString() || '-'}
                        disabled={true}
                        css={{
                          color: 'black',
                          fontWeight: 200,
                          fontSize: '1.2rem',
                        }}
                      />
                      <Input
                        type="text"
                        label="ПІБ лікаря"
                        placeholder=""
                        inputId={`doctorName-${index}`}
                        value={a.doctorName}
                        disabled={true}
                        css={{
                          color: 'black',
                          fontWeight: 200,
                          fontSize: '1.2rem',
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <p>Немає візитів</p>
                )}
              </div>

              {authCtx.tokenPayload?.role === UserRoles.REGISTRAR && (
                <Button
                  type="primary"
                  text="Новий запис до лікаря"
                  isSubmit={false}
                  css={{
                    width: 'fit-content',
                    fontSize: '1.3rem',
                    fontWeight: 300,
                    paddingLeft: '3rem',
                    paddingRight: '3rem',
                    height: '3.2rem',
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="appointments-controls-block">
          <h2
            className="page-title"
            style={{ marginTop: '2rem', marginBottom: '2rem' }}
          >
            Медичні записи пацієнта
          </h2>

          {authCtx.tokenPayload?.role === UserRoles.DOCTOR && (
            <Button
              type="primary"
              text="+&nbsp;&nbsp;&nbsp;&nbsp; Додати запис до картки"
              isSubmit={false}
              css={{
                width: 'fit-content',
                fontSize: '1rem',
                fontWeight: 300,
                paddingLeft: '2rem',
                paddingRight: '2rem',
                height: '3.2rem',
              }}
            />
          )}
        </div>
        <div className="medical-records-list">
          {medicalCardRecordsTestData.map((record, idx) => (
            <div className="medical-record-card" key={idx}>
              <div className="mr-top-row">
                <h4 className="mr-title">{record.title}</h4>
                <span className="mr-type-badge">
                  {getTypeLabel(record.type)}
                </span>
              </div>

              <div className="mr-bottom-row">
                <ul className="mr-items">
                  {/* DIAGNOSIS */}
                  {record.type === 'DIAGNOSIS' && record.diagnosis && (
                    <li>{record.diagnosis}</li>
                  )}

                  {/* ANALYSIS_RESULTS */}
                  {record.type === 'ANALYSIS_RESULTS' &&
                  record.analysisResults?.length
                    ? record.analysisResults.map((res, i) => (
                        <li key={i}>
                          <a
                            href={
                              import.meta.env.VITE_CDN_BASE_URL + '/sample.pdf'
                            }
                            style={{ textDecoration: 'underline' }}
                          >
                            {res}
                          </a>
                        </li>
                      ))
                    : null}

                  {/* NECESSARY_EXAMINATIONS */}
                  {record.type === 'NECESSARY_EXAMINATIONS' &&
                  record.examinations?.length
                    ? record.examinations.map((ex, i) => <li key={i}>{ex}</li>)
                    : null}
                </ul>

                <div className="mr-date">{formatDate(record.date)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientPage;
