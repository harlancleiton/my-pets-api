import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards';
import { GqlCurrentUser } from './decorators';
import { UserType } from '../users/types';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user = await this.authService.validateUser(username, password);
    return (await this.authService.login(user)).access_token;
  }

  @Query(() => UserType)
  @UseGuards(GqlAuthGuard)
  me(@GqlCurrentUser() user: UserType) {
    return user;
  }
}
