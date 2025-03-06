import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import Input from './Input';
import Button from './Button';
import api from '../service/axiosUtils';
import '../styles/PriceListForm.css';
import { StatusResponseDto } from '../types/common';

// Updated shape to include name in the schema
const priceListSchema = z.object({
  name: z.string().nonempty('Введіть назву'),
  entries: z.record(
    z
      .number({ invalid_type_error: 'Ціна послуги має бути вказана' })
      .nonnegative("Ціна не може бути від'ємною"),
  ),
});

// Infer TypeScript type from the schema
export type FormValues = z.infer<typeof priceListSchema>;

/** The shape of each service entry from /owner/price-lists/active */
interface CurrentPriceListEntryDto {
  label: string;
  serviceId: number;
  price: number;
}

/** The shape returned by /owner/price-lists/active */
export interface CurrentPriceListDto {
  name: string; // We assume the backend now returns a name as well
  entries: CurrentPriceListEntryDto[];
}

/** The DTO we'll send back to the backend */
export interface NewPriceListEntryDto {
  serviceId: number;
  price: number;
}

export interface NewPriceListDto {
  name: string;
  entries: NewPriceListEntryDto[];
}

export interface PriceListFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const PriceListForm: React.FC<PriceListFormProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [priceListData, setPriceListData] =
    useState<CurrentPriceListDto | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(priceListSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  useEffect(() => {
    if (isOpen) {
      fetchActivePriceList();
    }
  }, [isOpen]);

  const fetchActivePriceList = async () => {
    setLoading(true);
    try {
      const response = await api.get<CurrentPriceListDto>(
        '/owner/price-lists/active',
      );
      console.log('CURRENT ACTIVE', response);
      setPriceListData(response);

      // Build default values for the form
      const defaultEntries: Record<string, number> = {};
      response.entries.forEach((entry) => {
        defaultEntries[entry.serviceId.toString()] = entry.price;
      });

      // Populate the form with name + entries
      reset({
        name: response.name ?? '', // if the response doesn't have a name, fallback to empty
        entries: defaultEntries,
      });
    } catch (error) {
      toast.error('Не вдалося завантажити поточний прайс-лист');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!priceListData) return;

    const newEntries: NewPriceListEntryDto[] = priceListData.entries.map(
      (entry) => ({
        serviceId: entry.serviceId,
        price: data.entries[entry.serviceId.toString()],
      }),
    );

    const newPriceListDto: NewPriceListDto = {
      name: data.name,
      entries: newEntries,
    };

    console.log('Submitting newPriceListDto:', newPriceListDto);

    try {
      await api.post<StatusResponseDto, NewPriceListDto>(
        '/owner/price-lists',
        newPriceListDto,
      );
      toast.success('Прайс лист успішно створено');
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

        {loading && <p>Завантаження...</p>}

        {!loading && priceListData && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* 
              1) Name input 
            */}
            <Input
              type="text"
              label="Назва прайс-листа"
              inputId="name"
              placeholder="Введіть назву прайс-листа"
              error={errors.name?.message}
              register={register('name')}
              css={{ marginBottom: '1rem' }}
            />

            {/* 
              2) Dynamic list of service entries 
            */}
            {priceListData.entries.map((entry) => (
              <Input
                key={entry.serviceId}
                type="number"
                label={entry.label}
                inputId={`service-${entry.serviceId}`}
                placeholder={`Ціна для ${entry.label}`}
                error={
                  errors.entries &&
                  errors.entries[entry.serviceId.toString()]?.message
                }
                register={register(`entries.${entry.serviceId.toString()}`, {
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
        )}
      </div>
    </div>
  );
};

export default PriceListForm;
