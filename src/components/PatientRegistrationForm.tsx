import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
} from '../types/patients';
import Input from './Input';

import '../styles/PatientRegistrationForm.css';
import { toast } from 'react-toastify';
import Button from './Button';
import Select from './Select';
import api from '../service/axiosUtils';
import { StatusResponseDto } from '../types/common';

type StepOneData = ReturnType<typeof stepOneSchema.parse>;
type StepTwoData = ReturnType<typeof stepTwoSchema.parse>;
type StepThreeData = ReturnType<typeof stepThreeSchema.parse>;

interface PatientData extends StepOneData, StepTwoData, StepThreeData {}

interface PatientRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const PatientRegistrationForm: React.FC<PatientRegistrationFormProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState(1);

  const [count, setCount] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isCodeBlocked, setIsCodeBlocked] = useState(false);

  const [patientData, setPatientData] = useState<Partial<PatientData>>({});

  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    formState: { errors: errorsStep1 },
    reset: resetStep1,
  } = useForm<StepOneData>({
    resolver: zodResolver(stepOneSchema),
    reValidateMode: 'onSubmit',
    mode: 'onSubmit',
  });

  const {
    register: registerStep2,
    handleSubmit: handleSubmitStep2,
    formState: { errors: errorsStep2 },
    reset: resetStep2,
  } = useForm<StepTwoData>({
    resolver: zodResolver(stepTwoSchema),
    reValidateMode: 'onSubmit',
    mode: 'onSubmit',
  });

  const {
    register: registerStep3,
    handleSubmit: handleSubmitStep3,
    formState: { errors: errorsStep3 },
    reset: resetStep3,
  } = useForm<StepThreeData>({
    resolver: zodResolver(stepThreeSchema),
    reValidateMode: 'onSubmit',
    mode: 'onSubmit',
  });

  const decOnClose = () => {
    if (isCodeBlocked) {
      api
        .delete<StatusResponseDto>(
          `/public/remove-verification?email=${encodeURIComponent(patientData.email ?? '')}`,
        )
        .then((v) => console.log(v.status))
        .catch((e) => console.log(e));
    }
    setIsCodeBlocked(false);
    setStep(1);
    resetStep1();
    resetStep2();
    resetStep3();
    onClose();
  };

  const onSubmitStep1 = (data: StepOneData) => {
    setPatientData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const onSubmitStep2 = (data: StepTwoData) => {
    api
      .get<StatusResponseDto>(
        `/public/verify?email=${encodeURIComponent(patientData.email ?? '')}&code=${data.verificationCode}`,
      )
      .then((v) => {
        if (v.status === 'OK') {
          setIsCodeBlocked(true);
          setStep(3);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('Неправильний код підтвердження');
      });
  };

  const onSubmitStep3 = async (data: StepThreeData) => {
    const finalData = { ...patientData, ...data } as PatientData;
    try {
      await api.post<StatusResponseDto, PatientData>(
        '/public/patients',
        finalData,
      );

      toast.success('Пацієнт був успішно доданий');
      decOnClose();
    } catch (error) {
      toast.error('Не вдалося додати пацієнта');
      console.error('Error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ minWidth: '600px' }}>
        <button className="modal-close" onClick={decOnClose}>
          &times;
        </button>
        <div className="step-indicator">{step}/3</div>

        {step === 1 && (
          <form
            noValidate
            onSubmit={handleSubmitStep1(onSubmitStep1)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingBottom: '2rem',
            }}
          >
            <h2>
              Введення особистих
              <br />
              даних пацієнта
            </h2>
            <Input
              type="text"
              label="Прізвище"
              inputId="lastName"
              placeholder="Іванов"
              error={errorsStep1.lastName?.message}
              register={registerStep1('lastName')}
            />
            <Input
              type="text"
              label="Ім’я"
              inputId="firstName"
              placeholder="Іван"
              error={errorsStep1.firstName?.message}
              register={registerStep1('firstName')}
            />
            <Input
              type="text"
              label="По батькові"
              inputId="middleName"
              placeholder="Іванович"
              error={errorsStep1.middleName?.message}
              register={registerStep1('middleName')}
            />
            <Input
              type="phone"
              label="Номер телефону"
              inputId="phone"
              placeholder="+380501112233"
              error={errorsStep1.phone?.message}
              register={registerStep1('phone')}
            />
            <Input
              type="email"
              label="Електронна пошта"
              inputId="email"
              placeholder="example@vitalineph.com"
              disabled={isCodeBlocked}
              error={errorsStep1.email?.message}
              register={registerStep1('email')}
            />
            <Input
              type="date"
              label="Дата народження"
              inputId="dob"
              placeholder="12.02.2000"
              error={errorsStep1.dob?.message}
              register={registerStep1('dob')}
            />

            <Select
              label="Стать"
              selectId="sex"
              error={errorsStep1.sex?.message}
              register={registerStep1('sex')}
              options={[
                { label: 'Чоловіча', value: 'MALE' },
                { label: 'Жіноча', value: 'FEMALE' },
              ]}
            />

            <Button
              type="primary"
              text="Продовжити"
              isSubmit={true}
              css={{
                width: 'fit-content',
                fontSize: '1rem',
                fontWeight: 400,
                paddingLeft: '2rem',
                paddingRight: '2rem',
                height: '3.5rem',
                marginTop: '2rem',
              }}
            />
          </form>
        )}

        {step === 2 && (
          <form
            onSubmit={handleSubmitStep2(onSubmitStep2)}
            noValidate
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h2>
              Підтвердження електронної
              <br />
              адреси
            </h2>
            <Input
              type="number"
              label="Код підтвердження"
              inputId="verificationCode"
              placeholder="234554"
              error={errorsStep2.verificationCode?.message}
              register={registerStep2('verificationCode')}
              disabled={isCodeBlocked}
            />

            <div
              className="button-row"
              style={{ width: '100%', alignItems: 'center' }}
            >
              {!isCodeBlocked && (
                <Button
                  type={count > 0 ? 'secondary' : 'primary'}
                  text="Відправити код"
                  isSubmit={false}
                  css={{
                    width: 'fit-content',
                    fontSize: '1rem',
                    fontWeight: 400,
                    paddingLeft: '2rem',
                    paddingRight: '2rem',
                    height: '3.5rem',
                  }}
                  disabled={count > 0}
                  onClick={() => {
                    api
                      .get<StatusResponseDto>(
                        `/public/send-verification?email=${encodeURIComponent(patientData.email ?? '')}`,
                      )
                      .then((v) => {
                        console.log(v.status);
                        toast.success('Код успішно відправлено');
                        setCount(30);
                        intervalRef.current = setInterval(() => {
                          setCount((prevCount) => {
                            if (prevCount <= 1) {
                              if (intervalRef.current) {
                                clearInterval(intervalRef.current);
                              }
                              return 0;
                            }
                            return prevCount - 1;
                          });
                        }, 1000);
                      })
                      .catch((error) => {
                        console.log(error);
                        toast.error('Не вдалось відправити код');
                      });
                  }}
                />
              )}
              {count !== 0 && (
                <p style={{ margin: 0 }}>
                  Повторно відправити код можна через{' '}
                  <b style={{ fontWeight: 500 }}>{count} секунд</b>
                </p>
              )}
            </div>
            <div
              className="button-row"
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                type="secondary"
                text="Назад"
                isSubmit={false}
                css={{
                  width: 'fit-content',
                  fontSize: '1rem',
                  fontWeight: 400,
                  paddingLeft: '4rem',
                  paddingRight: '4rem',
                  marginRight: '1rem',
                  height: '3.5rem',
                }}
                onClick={() => setStep(1)}
              />
              <Button
                type="primary"
                text="Продовжити"
                isSubmit={true}
                css={{
                  width: 'fit-content',
                  fontSize: '1rem',
                  fontWeight: 400,
                  paddingLeft: '2rem',
                  paddingRight: '2rem',
                  height: '3.5rem',
                }}
              />
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmitStep3(onSubmitStep3)} noValidate>
            <h2>Вибір пільгової групи</h2>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="benefit">Пільгова група (необов’язково)</label>
              <select id="benefit" {...registerStep3('benefit')}>
                <option value="">Без пільг</option>
                <option value="military">Військові (знижка 20%)</option>
                <option value="elderly">Люди похилого віку (знижка 10%)</option>
                <option value="disabled">
                  Люди з інвалідністю (знижка 5%)
                </option>
                <option value="staff_family">
                  Члени родин працівників (знижка 40%)
                </option>
              </select>
              {errorsStep3.benefit && (
                <span style={{ color: 'red' }}>
                  {errorsStep3.benefit.message}
                </span>
              )}
            </div>

            <div
              className="button-row"
              style={{ flexDirection: 'row', justifyContent: 'center' }}
            >
              <Button
                type="secondary"
                text="Назад"
                isSubmit={false}
                css={{
                  width: 'fit-content',
                  fontSize: '1rem',
                  fontWeight: 400,
                  paddingLeft: '2rem',
                  paddingRight: '2rem',
                  marginRight: '1rem',
                  height: '3.5rem',
                }}
                onClick={() => setStep(2)}
              />
              <Button
                type="primary"
                text="Зберегти пацієнта"
                isSubmit={true}
                css={{
                  width: 'fit-content',
                  fontSize: '1rem',
                  fontWeight: 400,
                  paddingLeft: '2rem',
                  paddingRight: '2rem',
                  height: '3.5rem',
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PatientRegistrationForm;
