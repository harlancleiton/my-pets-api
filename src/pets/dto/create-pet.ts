import {
  IsNotEmpty,
  IsInt,
  IsEnum,
  IsPositive,
  IsNumber,
  IsString,
} from 'class-validator';
import { Gender } from '../../shared/models';
import { PetTypeEnum } from '../models';

export class CreatePet {
  @IsNotEmpty()
  name: string;

  @IsString()
  breed: string;

  @IsInt()
  @IsPositive()
  age: number;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsEnum(PetTypeEnum)
  type: PetTypeEnum;

  @IsNumber()
  @IsPositive()
  weight: number;
}
