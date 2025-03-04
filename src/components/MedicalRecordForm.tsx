import React, { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import '../styles/PatientRegistrationForm.css';
import '../styles/Input.css';
import {
  CreateMedicalCardRecordDto,
  createMedicalCardRecordSchema,
  MedicalCardRecordTypes,
} from '../types/cardRecords';

interface MedicalRecordFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ServiceOption {
  id: string;
  label: string;
}

const MedicalRecordForm: React.FC<MedicalRecordFormProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateMedicalCardRecordDto>({
    resolver: zodResolver(createMedicalCardRecordSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      type: MedicalCardRecordTypes.DIAGNOSIS,
    },
  });

  const selectedType = useWatch({
    control,
    name: 'type',
    defaultValue: MedicalCardRecordTypes.DIAGNOSIS,
  });

  const [availableServices, setAvailableServices] = useState<ServiceOption[]>(
    [],
  );

  useEffect(() => {
    if (selectedType === MedicalCardRecordTypes.NECESSARY_EXAMINATIONS) {
      // TODO implement
      setTimeout(() => {
        setAvailableServices([
          { id: 'service1', label: 'УЗД' },
          { id: 'service2', label: 'КТ' },
          { id: 'service3', label: 'МРТ' },
          { id: 'service4', label: 'ЕХО' },
          { id: 'service5', label: 'Рентген' },
          { id: 'service6', label: 'Лабораторне обстеження' },
        ]);
      }, 100);
    }
  }, [selectedType]);

  const onSubmit = async (data: CreateMedicalCardRecordDto) => {
    if (data.analysisResults) {
      const files = Array.from(data.analysisResults);
      console.log('Analysis Results Files:', files);
    }
    console.log('Submitted Data:', data);
    toast.success('Медичний запис успішно додано');
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ width: '40vw' }}>
        <button
          className="modal-close"
          onClick={() => {
            reset();
            onClose();
          }}
        >
          &times;
        </button>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Додавання медичного запису
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Input
            type="text"
            label="Назва запису"
            inputId="title"
            placeholder="Введіть назву запису"
            error={errors.title?.message}
            register={register('title')}
            css={{ marginBottom: '1rem' }}
          />
          <Controller
            name="type"
            control={control}
            defaultValue={MedicalCardRecordTypes.DIAGNOSIS}
            render={({ field }) => (
              <Select
                label="Тип запису"
                selectId="type"
                error={errors.type?.message}
                value={field.value}
                onChange={field.onChange}
                options={[
                  { label: 'Діагноз', value: MedicalCardRecordTypes.DIAGNOSIS },
                  {
                    label: 'Необхідні обстеження',
                    value: MedicalCardRecordTypes.NECESSARY_EXAMINATIONS,
                  },
                  {
                    label: 'Результати аналізів',
                    value: MedicalCardRecordTypes.ANALYSIS_RESULTS,
                  },
                ]}
              />
            )}
          />

          {selectedType === MedicalCardRecordTypes.DIAGNOSIS && (
            <Input
              type="text"
              label="Діагноз"
              inputId="diagnosis"
              placeholder="Введіть діагноз"
              error={errors.diagnosis?.message}
              register={register('diagnosis')}
              css={{ marginBottom: '1rem' }}
            />
          )}

          {selectedType === MedicalCardRecordTypes.ANALYSIS_RESULTS && (
            <div
              style={{
                margin: 0,
                marginBottom: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
              }}
            >
              <div className="labels-holder" style={{ marginBottom: '0.5rem' }}>
                <label htmlFor="analysisResults" className="label-text">
                  Результати аналізів (до 5 PDF-файлів)
                </label>
                {errors.analysisResults && (
                  <p className="label-text error-message">
                    {errors.analysisResults.message}
                  </p>
                )}
              </div>
              <input
                type="file"
                id="analysisResults"
                accept="application/pdf"
                className={errors.analysisResults ? 'input-error' : ''}
                multiple
                {...register('analysisResults')}
                style={{
                  width: '100%',
                  margin: 0,
                  paddingTop: '0.5rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          )}

          {selectedType === MedicalCardRecordTypes.NECESSARY_EXAMINATIONS && (
            <div
              style={{
                marginBottom: '1rem',
                width: '100%',
              }}
            >
              <div className="labels-holder" style={{ marginBottom: '0.5rem' }}>
                <label className="label-text">
                  Обстеження (виберіть одну або декілька послуг)
                </label>
                {errors.examinations && (
                  <p className="label-text error-message">
                    {errors.examinations.message}
                  </p>
                )}
              </div>
              <div
                style={{
                  maxHeight: '200px',
                  overflowY: 'auto',
                  border: '1px solid #ccc',
                  padding: '0.5rem',
                  borderRadius: '4px',
                }}
              >
                {availableServices.map((service) => (
                  <label
                    key={service.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '0.5rem',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      value={service.id}
                      {...register('examinations')}
                    />
                    <span style={{ marginLeft: '0.5rem' }}>
                      {service.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <Button
            type="primary"
            text="Зберегти запис"
            isSubmit={true}
            css={{
              width: 'fit-content',
              fontSize: '1.3rem',
              fontWeight: 400,
              paddingLeft: '2rem',
              paddingRight: '2rem',
              height: '3.5rem',
              marginTop: '1rem',
              marginBottom: '2rem',
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default MedicalRecordForm;
