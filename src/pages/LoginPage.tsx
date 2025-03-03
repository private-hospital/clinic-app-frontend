import '../styles/LoginPage.css';
import Input from '../components/Input';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { LoginFormDto, loginSchema } from '../types/auth';
import { goToMainPage } from '../service/navigationUtils';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import { getTokenPayload } from '../service/authUtils';

const LoginPage = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)!;
  if (authCtx.tokenPayload) {
    goToMainPage(navigate, authCtx.tokenPayload.role);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormDto>({
    resolver: zodResolver(loginSchema),
    reValidateMode: 'onSubmit',
    mode: 'onSubmit',
  });

  const onSubmit = async (data: LoginFormDto) => {
    try {
      console.log(data);

      if (data.email.toLowerCase() === 'doctor@gmail.com') {
        localStorage.setItem(
          import.meta.env.VITE_AUTH_TOKEN_LS_KEY_NAME!,
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjEsInJvbGUiOiJET0NUT1IifSwiaWF0IjoxNzQwOTI1ODk5LCJleHAiOjE3NDE3ODk4OTl9.zJ8-cKpdrk_9ra_8kmHlhGzegTE-teWEy3xUPETeaRk',
        );
      }
      if (data.email.toLowerCase() === 'head@gmail.com') {
        localStorage.setItem(
          import.meta.env.VITE_AUTH_TOKEN_LS_KEY_NAME!,
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjEsInJvbGUiOiJDTElOSUNfSEVBRCJ9LCJpYXQiOjE3NDA5MjY0NDksImV4cCI6MTc0MTc5MDQ0OX0.5VIVeWkHLXrF9kHaXBGBkm4Y1GwNJO2nq8MhH9ZUmu8',
        );
      }
      if (data.email.toLowerCase() === 'registrar@gmail.com') {
        localStorage.setItem(
          import.meta.env.VITE_AUTH_TOKEN_LS_KEY_NAME!,
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjEsInJvbGUiOiJSRUdJU1RSQVIifSwiaWF0IjoxNzQwOTI2NDE0LCJleHAiOjE3NDE3OTA0MTR9.LVwt0rOmF_y__Wcs1oU5pm4atJoUReRqDcNYbrrrQSs',
        );
      }

      const token: string = localStorage.getItem(
        import.meta.env.VITE_AUTH_TOKEN_LS_KEY_NAME!,
      )!;
      authCtx?.setTokenPayload(getTokenPayload(token));

      toast.success('Успішна авторизація');

      console.log(authCtx);
      goToMainPage(navigate, authCtx.tokenPayload?.role);

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
          noValidate
          className="centered-flex-box"
          style={{ marginTop: '2rem' }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="email"
            placeholder="example@vitalineph.com"
            label="Email"
            inputId="email"
            error={errors.email?.message}
            register={register('email')}
          />
          <Input
            type="password"
            placeholder="••••••••"
            label="Пароль"
            inputId="password"
            error={errors.password?.message}
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
