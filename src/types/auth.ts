import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().nonempty('Введіть email').email('Неправильний формат'),
  password: z.string().nonempty('Введіть пароль'),
});

export type LoginFormDto = z.infer<typeof loginSchema>;

export interface LoginResponseDto {
  accessToken: string;
}
