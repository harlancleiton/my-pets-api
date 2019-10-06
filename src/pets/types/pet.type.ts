import { Field, ID, ObjectType, Int, Float } from 'type-graphql';
import { Gender } from '../../shared/models';
import { PetTypeEnum } from '../models';

@ObjectType()
export class PetType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => PetTypeEnum)
  type: PetTypeEnum;

  @Field({ nullable: true })
  breed?: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field(() => Float, { nullable: true })
  weight: number;

  @Field(() => Gender)
  gender: Gender;
}
