import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import Input from './Input';
import Button from './Button';
import {
  currentPriceListTestData,
  NewPriceListDto,
  PriceListFormProps,
} from '../types/priceLists';
import '../styles/PriceListForm.css';

const priceListSchema = z.object({
  entries: z.record(
    z
      .number({ invalid_type_error: 'Ціна послуги має бути вказана' })
      .nonnegative("Ціна не може бути від'ємною"),
  ),
});

export type FormValues = z.infer<typeof priceListSchema>;

const PriceListForm: React.FC<PriceListFormProps> = ({ isOpen, onClose }) => {
  const defaultValues: FormValues = {
    entries: currentPriceListTestData.entries.reduce(
      (acc, service) => {
        acc[service.serviceId.toString()] = service.price;
        return acc;
      },
      {} as Record<string, number>,
    ),
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(priceListSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit = async (data: FormValues) => {
    const newEntries = currentPriceListTestData.entries.map((service) => ({
      serviceId: service.serviceId,
      price: Number(data.entries[service.serviceId.toString()]),
    }));
    const newPriceListDto: NewPriceListDto = { entries: newEntries };
    console.log(newPriceListDto);

    try {
      // TODO: implement API call to update price list.
      toast.success('Прайс лист успішно оновлено');
    } catch (error) {
      toast.error('Помилка мережі');
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
          Створення нового прайс-листа
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
          {currentPriceListTestData.entries.map((service) => (
            <Input
              key={service.serviceId}
              type="number"
              label={service.label}
              inputId={`service-${service.serviceId}`}
              placeholder={`Ціна для ${service.label}`}
              defaultValue={service.price}
              error={
                errors.entries &&
                errors.entries[service.serviceId.toString()]?.message
              }
              register={register(`entries.${service.serviceId.toString()}`, {
                valueAsNumber: true,
              })}
              css={{ marginBottom: '1rem' }}
            />
          ))}
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

export default PriceListForm;
