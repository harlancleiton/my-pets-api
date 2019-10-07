import { Field, ID, ObjectType } from 'type-graphql';
import { PetTypeEnum } from '../../pets/models';
import { UserResponse } from '../../users/dto';

@ObjectType()
export class VetType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  bio: string;

  @Field({ nullable: true })
  user?: UserResponse;

  @Field(() => [PetTypeEnum])
  specialties: PetTypeEnum[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
