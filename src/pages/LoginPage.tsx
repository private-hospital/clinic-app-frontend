import '../styles/LoginPage.css';
import Input from '../components/Input';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

const loginSchema = z.object({
  email: z.string().nonempty('Введіть email').email('Неправильний формат'),
  password: z.string().nonempty('Введіть пароль'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    reValidateMode: 'onSubmit',
    mode: 'onSubmit',
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      toast.success('Успішна авторизація');
      console.log(data);
      // Example API call (uncomment if needed)
      // const response = await api.post<LoginResponseDto, LoginRequestDto>(
      //   '/public/login',
      //   data
      // );
      // localStorage.setItem(
      //   import.meta.env.VITE_AUTH_TOKEN_LS_KEY_NAME ?? '',
      //   response.accessToken
      // );
    } catch (error) {
      toast.error('Не вдалось авторизуватись');
      console.log(error);
    }
  };

  return (
    <div className="bg-div">
      <div className="login-box">
        <div className="centered-flex-box">
          <img
            src={import.meta.env.VITE_CDN_BASE_URL + '/svg/logo.svg'}
            className="logo-img"
            alt="Blue VitaLine Logo"
          />
          <p className="return-text">
            З поверненням! Будь ласка, виконайте
            <br />
            вхід до свого облікового запису.
          </p>
        </div>
        <form
          className="centered-flex-box"
          style={{ marginTop: '2rem' }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="email"
            placeholder="example@vitalineph.com"
            label="Email"
            inputId="email"
            error={isSubmitted ? errors.email?.message : undefined}
            register={register('email')}
          />
          <Input
            type="password"
            placeholder="••••••••"
            label="Пароль"
            inputId="password"
            error={isSubmitted ? errors.password?.message : undefined}
            register={register('password')}
          />
          <Button
            type="primary"
            text="Вхід"
            css={{ width: '100%' }}
            isSubmit={true}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
