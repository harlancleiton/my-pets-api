import { Field, ID, ObjectType } from 'type-graphql';
import { PetTypeEnum } from '../../pets/models';
import { UserType } from '../../users/types';

@ObjectType()
export class VetType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  bio: string;

  @Field({ nullable: true })
  user?: UserType;

  @Field(() => [PetTypeEnum])
  specialties: PetTypeEnum[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
