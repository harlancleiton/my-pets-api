import {
  IsEnum,
  IsArray,
  IsString,
  Length,
  IsBoolean,
  IsMongoId,
  ArrayNotEmpty,
  IsOptional,
} from 'class-validator';
import { PetTypeEnum } from '../../pets/models';

export class CreateVet {
  @IsOptional()
  @IsMongoId()
  user?: string;

  @IsString()
  @Length(0, 256)
  bio: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(PetTypeEnum)
  specialties: PetTypeEnum[];

  @IsBoolean()
  active: boolean;
}
