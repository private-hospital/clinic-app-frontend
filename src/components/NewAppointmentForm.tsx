import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import api from '../service/axiosUtils';
import Button from './Button';
import Select from './Select';
import Input from './Input';
import { StepOneForm, stepOneSchema } from '../types/appointments';
import '../styles/NewAppointmentForm.css';
import { RouteParams, StatusResponseDto } from '../types/common';
import { AvailableServicesDto } from './FilterModal';
import { SelectOption } from '../types/selectComponent';
import { useParams } from 'react-router';

interface AvailableDoctor {
  id: number;
  displayName: string;
}

interface AvailableTimes {
  entries: string[];
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

export interface PriceResponseDto {
  service: string;
  price: number;
}

export interface PatientDiscountDto {
  patientId: string;
  discountPercent: number;
}

const NewAppointmentForm: React.FC<NewAppointmentFormProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState(1);
  const [serviceOptions, setServiceOptions] = useState<SelectOption[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const { id } = useParams<RouteParams>();

  const fetchServiceNames = async () => {
    try {
      const response = await api.get<AvailableServicesDto>(
        '/public/services/names',
      );
      const services = response.services.map((s: string): SelectOption => {
        return {
          value: s,
          label: s,
        };
      });
      services.unshift({ value: '', label: '' });
      setServiceOptions(services);
    } catch (error) {
      console.error('Error fetching service names:', error);
      toast.error('Не вдалось завантажити доступні послуги');
      setServiceOptions([]);
    }
  };

  const getPatientDiscount = async (): Promise<void> => {
    try {
      const response = await api.get<PatientDiscountDto>(
        `/registrar/get-patient-discount?patientId=${id}`,
      );
      setDiscount(response.discountPercent);
    } catch (error) {
      console.error('Error fetching patient discount:', error);
      toast.error('Не вдалось отримати інформацію про знижку пацієнта');
    }
  };

  useEffect(() => {
    getPatientDiscount();
    fetchServiceNames();
  }, []);

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
      appointments: [
        { service: '', doctorId: '', doctorName: '', date: '', time: '' },
      ],
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
    append({ service: '', doctorId: '', doctorName: '', date: '', time: '' });
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

  const onSubmitStep1 = async (data: StepOneForm) => {
    setStepOneData(data);
    setStep(2);
  };

  const onSubmitStep2 = async () => {
    try {
      await api.post<StatusResponseDto, StepOneForm>(
        `/api/appointments/create-appointments`,
        stepOneData!,
      );
      toast.success('Записи успішно створено');
      handleClose();
    } catch (error) {
      toast.error('Не вдалося створити записи');
      console.error(error);
    }
  };

  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  const getSubtotal = async (): Promise<void> => {
    let res = 0;
    for (const el of stepOneData?.appointments ?? []) {
      res += (await getPriceForAppointment(el.service)) ?? 0;
    }
    setSubtotal(res);
  };

  const getTotal = () => {
    setTotal((subtotal * discount) / 100);
  };

  useEffect(() => {
    getSubtotal();
  }, [stepOneData]);

  useEffect(() => {
    getTotal();
  }, [subtotal]);

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

  const handleServiceChange = async (index: number, serviceValue: string) => {
    update(index, {
      service: serviceValue,
      doctorId: '',
      doctorName: '',
      date: '',
      time: '',
    });

    try {
      const response = await api.get<{ entries: AvailableDoctor[] }>(
        `/registrar/available-doctors?service=${serviceValue}`,
      );
      const doctors = response.entries.map((doc) => ({
        label: doc.displayName,
        value: doc.id.toString(),
      }));
      doctors.unshift({ value: '', label: '' });

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
    } catch (error) {
      console.error('Error fetching doctors:', error);
      toast.error('Не вдалося отримати список лікарів');
    }
  };

  const handleDoctorChange = (index: number, doctorId: string) => {
    const selectedDoctor = rowsState[index].doctors.find(
      (doc) => doc.value === doctorId,
    );

    update(index, {
      ...fields[index],
      doctorId: doctorId,
      doctorName: selectedDoctor ? selectedDoctor.label : '',
      date: '',
      time: '',
    });

    setRowsState((prev) => {
      const newArr = [...prev];
      newArr[index] = {
        ...newArr[index],
        isDateDisabled: false,
        isTimeDisabled: true,
        times: [],
      };
      return newArr;
    });
  };

  const handleDateChange = async (index: number, dateValue: string) => {
    const doctorId = fields[index].doctorId;
    update(index, { ...fields[index], date: dateValue, time: '' });

    if (!doctorId) return;

    try {
      const response = await api.get<AvailableTimes>(
        `/registrar/available-times?doctorId=${doctorId}&date=${dateValue}`,
      );

      setRowsState((prev) => {
        const newArr = [...prev];
        newArr[index] = {
          ...newArr[index],
          times: response.entries.map((time) => ({
            label: time,
            value: time,
          })),
          isTimeDisabled: false,
        };
        return newArr;
      });
    } catch (error) {
      console.error('Error fetching available times:', error);
      toast.error('Не вдалося отримати доступні години');
    }
  };

  const handleTimeChange = (index: number, timeValue: string) => {
    update(index, { ...fields[index], time: timeValue });
  };

  async function getPriceForAppointment(
    serviceName: string,
  ): Promise<number | null> {
    try {
      const response = await api.get<PriceResponseDto>(
        `/registrar/get-price-for-service?service=${encodeURIComponent(serviceName)}`,
      );

      return response.price;
    } catch (error) {
      console.error('Error fetching service price:', error);
      return null;
    }
  }

  if (!isOpen) return null;

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
                          options={serviceOptions ?? []}
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
                          selectId={`appointments.${index}.doctorId`}
                          error={
                            errors.appointments?.[index]?.doctorId?.message ||
                            undefined
                          }
                          disableErr={true}
                          register={register(
                            `appointments.${index}.doctorId` as const,
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
                          disableErr={rowState.isDateDisabled}
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
                          onChange={(e) =>
                            handleTimeChange(index, e.target.value)
                          }
                          options={rowState.times}
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
                  const price = getPriceForAppointment(appt.service);
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
                    {subtotal.toFixed(2)} грн
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
                    {total.toFixed(2) || 0} грн
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
