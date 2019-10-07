import { InputType, Field, ID } from 'type-graphql';
import { PetTypeEnum } from '../../pets/models';

@InputType()
export class VetInput {
  @Field(() => ID, { nullable: true })
  user: string;

  @Field(() => String)
  bio: string;

  @Field(() => [PetTypeEnum])
  specialties: PetTypeEnum[];

  @Field(() => Boolean)
  active: boolean;
}
