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
                  register={register('sex')}
                  options={[
                    { label: 'Чоловік', value: 'MALE' },
                    { label: 'Жінка', value: 'FEMALE' },
                  ]}
                  css={errors.sex?.message ? {} : { backgroundColor: 'white' }}
                />

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
              </form>
            ) : (
              <p>Завантаження даних пацієнта...</p>
            )}
          </div>
          <div className="sub-info-block">
            <h3>Візити до лікаря</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPage;
