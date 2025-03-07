import '../styles/ArchivePriceListForm.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from './Input';
import Button from './Button';
import '../styles/PriceListForm.css';

const archiveSchema = z.object({
  reason: z.string().nonempty('Це поле є обовʼязковим'),
});

type ArchiveFormValues = z.infer<typeof archiveSchema>;

interface ArchivePriceListFormProps {
  isOpen: boolean;
  onClose: () => void;
  onArchive: (reason: string) => void;
}

const ArchivePriceListForm: React.FC<ArchivePriceListFormProps> = ({
  isOpen,
  onClose,
  onArchive,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ArchiveFormValues>({
    resolver: zodResolver(archiveSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const handleFormSubmit = (data: ArchiveFormValues) => {
    onArchive(data.reason);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="pl-modal-overlay">
      <div className="pl-modal-content" style={{ width: '30vw' }}>
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
          Архівування прайс-листа
        </h2>
        <p style={{ marginBottom: '2rem', textAlign: 'center' }}>
          Після архівування прайс-листа, його буде неможливо відновити. Якщо ви
          впевнені у своїх намірах, то надайте причину в полі нижче та натисніть
          “Архівувати”.
        </p>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Input
            type="text"
            label="Причина архівування"
            inputId="reason"
            placeholder="Вкажіть причину"
            error={errors.reason?.message}
            register={register('reason')}
            css={{ marginBottom: '1rem' }}
          />

          <Button
            type="primary"
            text="Архівувати"
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
              backgroundColor: '#c70000',
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default ArchivePriceListForm;
