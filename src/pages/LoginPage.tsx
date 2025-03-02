import '../styles/LoginPage.css';
import Input from '../components/Input';
import Button from '../components/Button';
import { useState } from 'react';
import * as React from 'react';
import validator from 'validator';
import { toast } from 'react-toastify';
// import api from '../service/axiosUtils';
// import {LoginRequestDto, LoginResponseDto} from "../types/auth";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined,
  );

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    let success: boolean = true;
    setEmailError(undefined);
    setPasswordError(undefined);
    if (!email) {
      setEmailError('Введіть email');
      success = false;
    } else if (!validator.isEmail(email)) {
      setEmailError('Невірний формат');
      success = false;
    }
    if (!password) {
      setPasswordError('Введіть пароль');
      success = false;
    }

    if (!success) {
      toast.error('Не вдалось авторизуватись');
      return;
    }

    toast.success('Успішна авторизація');
    // const dto: LoginRequestDto = {
    //   email,
    //   password,
    // };
    // api
    //   .post<LoginResponseDto, LoginRequestDto>('/public/login', dto)
    //   .then((v) => {
    //     localStorage.setItem(
    //       import.meta.env.VITE_AUTH_TOKEN_LS_KEY_NAME ?? '',
    //       v.accessToken,
    //     );
    //   });
  };

  return (
    <div className="bg-div">
      <div className="login-box">
        <div className="centered-flex-box">
          <img
            src={import.meta.env.VITE_CDN_BASE_URL + '/svg/logo.svg'}
            className="logo-img"
          />
          <p className="return-text">
            З поверненням! Будь ласка, виконайте
            <br />
            вхід до свого облікового запису.
          </p>
        </div>
        <div className="centered-flex-box" style={{ marginTop: '2rem' }}>
          <Input
            type="email"
            placeholder="example@vitalineph.com"
            label="Email"
            inputId="email"
            error={emailError}
            setValue={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="••••••••"
            label="Пароль"
            inputId="password"
            error={passwordError}
            setValue={(e) => setPassword(e.target.value)}
          />
          <Button
            type="primary"
            text="Вхід"
            onClick={handleSubmit}
            css={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
