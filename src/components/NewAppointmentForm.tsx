import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import Button from './Button';
import Select from './Select';
import Input from './Input';

import {
  StepOneForm,
  stepOneSchema,
  AppointmentRow,
} from '../types/appointments';
import '../styles/NewAppointmentForm.css';

function getAllServices(): { label: string; value: string }[] {
  // TODO: replace with actual API call
  return [
    { label: 'Оберіть послугу', value: '' },
    { label: 'УЗД', value: 'УЗД' },
    { label: 'Консультація невролога', value: 'Консультація невролога' },
    { label: 'МРТ', value: 'МРТ' },
  ];
}

async function fetchDoctorsByService(
  service: string,
): Promise<{ label: string; value: string }[]> {
  // TODO: replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      if (service === 'УЗД') {
        resolve([
          { label: 'Оберіть лікаря', value: '' },
          { label: 'Мельник Ольга Ігоровна', value: 'Мельник Ольга Ігоровна' },
          { label: 'Іваненко Олег Петрович', value: 'Іваненко Олег Петрович' },
        ]);
      } else if (service === 'Консультація невролога') {
        resolve([
          { label: 'Оберіть лікаря', value: '' },
          {
            label: 'Сидоренко Марія Василівна',
            value: 'Сидоренко Марія Василівна',
          },
          { label: 'Іваненко Олег Петрович', value: 'Іваненко Олег Петрович' },
        ]);
      } else {
        resolve([
          { label: 'Оберіть лікаря', value: '' },
          {
            label: 'Сидоренко Марія Василівна',
            value: 'Сидоренко Марія Василівна',
          },
          { label: 'Мельник Ольга Ігоровна', value: 'Мельник Ольга Ігоровна' },
        ]);
      }
    }, 100);
  });
}

async function fetchTimesByDoctorAndDate(
  doctor: string,
  date: string,
): Promise<{ label: string; value: string }[]> {
  console.log(doctor, date);
  // TODO: replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { label: 'Оберіть час', value: '' },
        { label: '09:00 - 09:30', value: '09:00' },
        { label: '09:30 - 10:00', value: '09:30' },
        { label: '10:00 - 10:30', value: '10:00' },
      ]);
    }, 500);
  });
}

interface RowState {
  doctors: { label: string; value: string }[];
  times: { label: string; value: string }[];
  isDoctorDisabled: boolean;
  isDateDisabled: boolean;
  isTimeDisabled: boolean;
}

interface NewAppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewAppointmentForm: React.FC<NewAppointmentFormProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<StepOneForm>({
    resolver: zodResolver(stepOneSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      appointments: [{ service: '', doctorName: '', date: '', time: '' }],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'appointments',
  });

  const [rowsState, setRowsState] = useState<RowState[]>(() =>
    fields.map(() => ({
      doctors: [],
      times: [],
      isDoctorDisabled: true,
      isDateDisabled: true,
      isTimeDisabled: true,
    })),
  );

  const handleAddRow = () => {
    append({ service: '', doctorName: '', date: '', time: '' });
    setRowsState((prev) => [
      ...prev,
      {
        doctors: [],
        times: [],
        isDoctorDisabled: true,
        isDateDisabled: true,
        isTimeDisabled: true,
      },
    ]);
  };

  const handleRemoveRow = (index: number) => {
    remove(index);
    setRowsState((prev) => {
      const newArr = [...prev];
      newArr.splice(index, 1);
      return newArr;
    });
  };

  const [stepOneData, setStepOneData] = useState<StepOneForm | null>(null);

  const onSubmitStep1 = (data: StepOneForm) => {
    setStepOneData(data);
    setStep(2);
  };

  const onSubmitStep2 = () => {
    console.log(stepOneData);
    toast.success('Записи успішно створено');
    handleClose();
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleClose = () => {
    setStep(1);
    onClose();
    reset();
    setRowsState(
      fields.map(() => ({
        doctors: [],
        times: [],
        isDoctorDisabled: true,
        isDateDisabled: true,
        isTimeDisabled: true,
      })),
    );
  };

  const getPriceForAppointment = (row: AppointmentRow) => {
    console.log(row);
    return 1000;
  };

  const totalWithoutDiscount = stepOneData?.appointments.reduce(
    (acc, row) => acc + getPriceForAppointment(row),
    0,
  );
  const discount = 0.4;
  const totalWithDiscount =
    totalWithoutDiscount && totalWithoutDiscount * (1 - discount);

  if (!isOpen) return null;

  const handleServiceChange = async (index: number, serviceValue: string) => {
    update(index, {
      service: serviceValue,
      doctorName: '',
      date: '',
      time: '',
    });

    const doctors = await fetchDoctorsByService(serviceValue);

    setRowsState((prev) => {
      const newArr = [...prev];
      newArr[index] = {
        doctors,
        times: [],
        isDoctorDisabled: false,
        isDateDisabled: true,
        isTimeDisabled: true,
      };
      return newArr;
    });
  };

  const handleDoctorChange = (index: number, doctorValue: string) => {
    update(index, {
      ...fields[index],
      doctorName: doctorValue,
      date: '',
      time: '',
    });

    setRowsState((prev) => {
      const newArr = [...prev];
      const row = newArr[index];
      newArr[index] = {
        ...row,
        isDateDisabled: false,
        times: [],
        isTimeDisabled: true,
      };
      return newArr;
    });
  };

  const handleDateChange = async (index: number, dateValue: string) => {
    const doctorName = (fields[index] as AppointmentRow).doctorName;
    update(index, { ...fields[index], date: dateValue, time: '' });

    const times = await fetchTimesByDoctorAndDate(doctorName, dateValue);

    setRowsState((prev) => {
      const newArr = [...prev];
      const row = newArr[index];
      newArr[index] = {
        ...row,
        times,
        isTimeDisabled: false,
      };
      return newArr;
    });
  };

  const handleTimeChange = (index: number, timeValue: string) => {
    update(index, { ...fields[index], time: timeValue });
  };

  const serviceOptions = getAllServices();

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose}>
          &times;
        </button>

        <div className="step-indicator">{step}/2</div>

        {step === 1 && (
          <form onSubmit={handleSubmit(onSubmitStep1)} className="step1-form">
            <h2 style={{ fontSize: '2rem' }}>Новий запис до лікаря</h2>

            <table className="custom-table">
              <thead>
                <tr>
                  <th>Послуга</th>
                  <th>Лікар</th>
                  <th>Дата прийому</th>
                  <th>Час</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => {
                  const rowState = rowsState[index];
                  return (
                    <tr key={field.id}>
                      <td>
                        <Select
                          label=""
                          selectId={`appointments.${index}.service`}
                          error={
                            errors.appointments?.[index]?.service?.message ||
                            undefined
                          }
                          disableErr={true}
                          register={register(
                            `appointments.${index}.service` as const,
                          )}
                          options={serviceOptions}
                          onChange={(e) =>
                            handleServiceChange(index, e.target.value)
                          }
                          disabled={false}
                          css={{ fontSize: '1rem' }}
                        />
                      </td>

                      <td>
                        <Select
                          label=""
                          selectId={`appointments.${index}.doctorName`}
                          error={
                            errors.appointments?.[index]?.doctorName?.message ||
                            undefined
                          }
                          disableErr={true}
                          register={register(
                            `appointments.${index}.doctorName` as const,
                          )}
                          options={rowState.doctors}
                          onChange={(e) =>
                            handleDoctorChange(index, e.target.value)
                          }
                          disabled={rowState.isDoctorDisabled}
                          css={{ fontSize: '1rem' }}
                        />
                      </td>

                      <td>
                        <Input
                          type="date"
                          label=""
                          placeholder=""
                          inputId={`appointments.${index}.date`}
                          error={errors.appointments?.[index]?.date?.message}
                          disableErr={true}
                          register={register(
                            `appointments.${index}.date` as const,
                          )}
                          onChange={(e) =>
                            handleDateChange(index, e.target.value)
                          }
                          disabled={rowState.isDateDisabled}
                          css={{ fontSize: '1rem' }}
                        />
                      </td>

                      <td>
                        <Select
                          label=""
                          selectId={`appointments.${index}.time`}
                          error={
                            errors.appointments?.[index]?.time?.message ||
                            undefined
                          }
                          disableErr={true}
                          register={register(
                            `appointments.${index}.time` as const,
                          )}
                          options={rowState.times}
                          onChange={(e) =>
                            handleTimeChange(index, e.target.value)
                          }
                          disabled={rowState.isTimeDisabled}
                          css={{ fontSize: '1rem' }}
                        />
                      </td>

                      <td>
                        <Button
                          type="secondary"
                          text="Видалити"
                          onClick={() => handleRemoveRow(index)}
                          isSubmit={false}
                          css={{
                            fontSize: '1rem',
                            height: '3.5rem',
                            width: '100%',
                            paddingLeft: '2rem',
                            paddingRight: '2rem',
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <Button
              type="secondary"
              text="+"
              isSubmit={false}
              onClick={handleAddRow}
              css={{
                width: '100%',
                height: '3rem',
                fontSize: '1.5rem',
                borderRadius: '6px',
                padding: 0,
                marginBottom: '1rem',
              }}
            />

            <div className="submit-row">
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

        {step === 2 && stepOneData && (
          <div className="step2-container">
            <h2>Підтвердження оплати послуг</h2>

            <table className="custom-table">
              <thead>
                <tr>
                  <th>Послуга</th>
                  <th>Лікар</th>
                  <th>Дата прийому</th>
                  <th>Час</th>
                  <th>Вартість, грн</th>
                </tr>
              </thead>
              <tbody>
                {stepOneData.appointments.map((appt, idx) => {
                  const price = getPriceForAppointment(appt);
                  return (
                    <tr key={idx}>
                      <td>{appt.service}</td>
                      <td>{appt.doctorName}</td>
                      <td>{appt.date}</td>
                      <td>{appt.time}</td>
                      <td>{price}</td>
                    </tr>
                  );
                })}
                <tr className="sum-row">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td style={{ textAlign: 'right' }}>Сума (без знижки)</td>
                  <td style={{ textAlign: 'left' }}>
                    {totalWithoutDiscount || 0} грн
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td style={{ textAlign: 'right' }}>Знижка:</td>
                  <td style={{ textAlign: 'left' }}>40%</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>
                    Сума (зі знижкою):
                  </td>
                  <td style={{ textAlign: 'left', fontWeight: 600 }}>
                    {totalWithDiscount?.toFixed(2) || 0} грн
                  </td>
                </tr>
              </tbody>
            </table>

            <Button
              type="primary"
              text="Завантажити рахунок"
              isSubmit={false}
              onClick={() => {
                toast.success('Рахунок успішно завантажено');
              }}
              css={{
                width: 'fit-content',
                fontSize: '1rem',
                fontWeight: 400,
                paddingLeft: '2rem',
                paddingRight: '2rem',
                height: '3.5rem',
                marginBottom: '2rem',
              }}
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '1rem',
              }}
            >
              <Button
                type="secondary"
                text="Назад"
                isSubmit={false}
                onClick={handleBack}
                css={{
                  width: 'fit-content',
                  fontSize: '1rem',
                  fontWeight: 400,
                  paddingLeft: '2rem',
                  paddingRight: '2rem',
                  height: '3.5rem',
                }}
              />
              <Button
                type="primary"
                text="Підтвердити оплату"
                isSubmit={true}
                onClick={onSubmitStep2}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default NewAppointmentForm;
