import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import Input from './Input';
import Button from './Button';
import '../styles/PriceListForm.css';
import {
  NewServiceDto,
  newServiceSchema,
  ServiceFormProps,
} from '../types/services';

const ServiceForm: React.FC<ServiceFormProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewServiceDto>({
    resolver: zodResolver(newServiceSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit = async (data: NewServiceDto) => {
    console.log('New Service DTO:', data);
    try {
      // TODO: Implement API call to send new service data to the server.
      toast.success('Послугу успішно додано');
    } catch (error) {
      toast.error('Сталася помилка при додаванні послуги');
      console.error(error);
    }
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="pl-modal-overlay">
      <div className="pl-modal-content" style={{ width: '40vw' }}>
        <button
          className="pl-modal-close"
          onClick={() => {
            reset();
            onClose();
          }}
        >
          &times;
        </button>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Додавання нової послуги
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
            label="Назва"
            inputId="serviceName"
            placeholder="Введіть назву послуги"
            error={errors.serviceName?.message}
            register={register('serviceName')}
            css={{ marginBottom: '1rem' }}
          />
          <Input
            type="number"
            label="Ціна"
            inputId="price"
            placeholder="Введіть ціну послуги"
            error={errors.price?.message}
            register={register('price', { valueAsNumber: true })}
            css={{ marginBottom: '1rem' }}
          />
          <Button
            type="primary"
            text="Зберегти"
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

export default ServiceForm;
