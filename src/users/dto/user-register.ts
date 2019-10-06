import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserRegister {
  @IsNotEmpty()
  @ApiModelProperty()
  name: string;

  @IsEmail()
  @ApiModelProperty()
  email: string;

  @IsNotEmpty()
  @ApiModelProperty()
  password: string;
}
