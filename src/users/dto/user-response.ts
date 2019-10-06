import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { UserRole } from '../models';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class UserResponse {
  @IsNotEmpty()
  @ApiModelProperty()
  @Expose()
  id: string;

  @IsNotEmpty()
  @ApiModelProperty()
  @Expose()
  name: string;

  @IsEmail()
  @ApiModelProperty()
  @Expose()
  email: string;

  @ApiModelProperty({ isArray: true, enum: UserRole })
  @Expose()
  roles: UserRole[];

  @ApiModelProperty()
  @Expose()
  createdAt: Date;

  @ApiModelProperty()
  @Expose()
  updatedAt: Date;

  @Exclude()
  get username() {
    return this.email;
  }
}
