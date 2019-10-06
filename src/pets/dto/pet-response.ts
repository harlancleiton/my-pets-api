import { Gender } from '../../shared/models';
import { IsNotEmpty, IsString, IsNumber, IsEnum, IsInt } from 'class-validator';
import { PetTypeEnum } from '../models';
import { Expose, Exclude, Type } from 'class-transformer';
import { UserResponse } from '../../users/dto';

@Exclude()
export class PetResponse {
  @Expose()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsString()
  breed?: string;

  @Expose()
  @IsInt()
  age?: number;

  @Expose()
  @IsNumber()
  weight: number;

  @Expose()
  @IsEnum(Gender)
  gender: Gender;

  @Expose()
  @IsNotEmpty()
  @IsEnum(PetTypeEnum)
  type: PetTypeEnum;

  @Type(() => UserResponse)
  @Exclude()
  user: UserResponse;
}
