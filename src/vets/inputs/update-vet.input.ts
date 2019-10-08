import { Field, InputType } from 'type-graphql';
import { PetTypeEnum } from '../../pets/models';

@InputType()
export class UpdateVetInput {
  @Field(() => String)
  bio: string;

  @Field(() => [PetTypeEnum])
  specialties: PetTypeEnum[];

  @Field(() => Boolean)
  active: boolean;
}
