import { IsString, IsDate, IsArray, IsEnum } from 'class-validator';
import { UserResponse } from '../../users/dto';
import { PetTypeEnum } from '../../pets/models';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class VetResponse {
  @IsString()
  @Expose()
  id: string;

  @IsString()
  @Expose()
  bio: string;

  @Expose()
  @Type(() => UserResponse)
  user?: UserResponse;

  @IsArray()
  @IsEnum(PetTypeEnum)
  @Expose()
  specialties: PetTypeEnum[];

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
