import { ObjectType, Field, ID } from 'type-graphql';
import { UserRole } from '../models';

@ObjectType({ description: 'Lorem Ipsum' })
export class UserType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [UserRole])
  roles: UserRole[];
}
