import {
  IsNotEmpty,
  IsInt,
  IsEnum,
  IsPositive,
  IsNumber,
  IsString,
} from 'class-validator';
import { Gender } from '../../shared/models';

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

  @IsNumber()
  @IsPositive()
  weight: number;
}
