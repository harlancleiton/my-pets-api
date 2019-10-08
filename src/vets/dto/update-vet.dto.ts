import {
  IsString,
  Length,
  IsEnum,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { PetTypeEnum } from '../../pets/models';

export class UpdateVet {
  @IsString()
  @Length(0, 256)
  bio: string;

  @IsEnum(PetTypeEnum, { each: true })
  specialties: PetTypeEnum[];

  @IsOptional()
  @IsBoolean()
  active: boolean;
}
