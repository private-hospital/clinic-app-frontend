import '../styles/LoginPage.css';
import Input from '../components/Input';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { LoginFormDto, loginSchema } from '../types/auth';
import { goToMainPage } from '../service/navigationUtils';
import { useNavigate } from 'react-router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../components/AuthContext';
import { getTokenPayload } from '../service/authUtils';
import { JwtPayload } from '../types/jwt';

const LoginPage = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)!;

  // Перевіряємо, чи є токен в контексті, якщо так, перенаправляємо на головну сторінку
  useEffect(() => {
    if (authCtx.tokenPayload) {
      goToMainPage(navigate, authCtx.tokenPayload.role);
    }
  }, [authCtx.tokenPayload, navigate]);

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
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/public/login/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Помилка авторизації');
      }

      // Збереження токена
      const token = `Bearer ${result.payload.accessToken}`;
      localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN_LS_KEY_NAME!, token);

      // Оновлення контексту авторизації
      const tokenPayload: JwtPayload | null = getTokenPayload(
        result.payload.accessToken,
      );

      if (tokenPayload) {
        authCtx?.setTokenPayload(tokenPayload);
        toast.success('Успішна авторизація');

        // Перенаправлення після оновлення контексту
        goToMainPage(navigate, tokenPayload.role); // Використовуємо role
      } else {
        toast.error('Помилка авторизації: не вдалося отримати токен.');
      }
    } catch (error: any) {
      toast.error(error.message || 'Не вдалося авторизуватись');
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
