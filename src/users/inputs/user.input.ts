import { InputType, Field } from 'type-graphql';
import { IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class UserInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;
}
