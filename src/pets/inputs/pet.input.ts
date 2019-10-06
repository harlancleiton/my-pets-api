import { Field, Int, Float, InputType } from 'type-graphql';
import { Gender } from '../../shared/models';

@InputType()
export class PetInput {
  @Field()
  name: string;

  @Field()
  breed: string;

  @Field(() => Int, { nullable: true })
  age: number;

  @Field(() => Gender)
  gender: Gender;

  @Field(() => Float)
  weight: number;
}
