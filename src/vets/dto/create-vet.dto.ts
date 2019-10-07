import {
  IsEnum,
  IsArray,
  IsString,
  Length,
  IsBoolean,
  IsMongoId,
  ArrayNotEmpty,
  IsOptional,
  IsIn,
} from 'class-validator';
import { PetTypeEnum } from '../../pets/models';

export class CreateVet {
  @IsOptional()
  @IsMongoId()
  user?: string;

  @IsString()
  @Length(0, 256)
  bio: string;

  @IsEnum(PetTypeEnum, { each: true })
  specialties: PetTypeEnum[];

  @IsOptional()
  @IsBoolean()
  active: boolean;
}
