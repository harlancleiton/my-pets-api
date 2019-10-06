import { Gender } from '../../shared/models';
import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';

export class PetResponse {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsString()
  breed?: string;

  age?: number;

  @IsNumber()
  weight: number;

  @IsEnum(Gender)
  gender: Gender;
}
