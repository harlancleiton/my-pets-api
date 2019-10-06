import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserType } from './types';
import { UsersService } from './users.service';
import { UserInput } from './inputs';

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => [UserType])
  async users() {
    return this.userService.findAll();
  }

  @Mutation(() => UserType)
  async createUser(@Args('userInput') userInput: UserInput) {
    return await this.userService.create(userInput);
  }

  @Mutation(() => UserType)
  async updateUser(
    @Args('id') id: string,
    @Args('userInput') userInput: UserInput,
  ) {
    return await this.userService.update(id, userInput);
  }
}
