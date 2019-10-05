import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserRegister {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
