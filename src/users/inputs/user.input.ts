import { InputType, Field } from 'type-graphql';
import { IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class UserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  password: string;
}
