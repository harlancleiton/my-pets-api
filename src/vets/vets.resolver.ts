import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { VetsService } from './vets.service';
import { VetType } from './types';
import { GqlAuthGuard } from '../auth/guards';
import { VetInput } from './inputs';
import { GqlCurrentUser } from '../auth/decorators';
import { UserType } from '../users/types';

@Resolver('Vets')
export class VetsResolver {
  constructor(private readonly vetService: VetsService) {}

  @Mutation(() => VetType)
  @UseGuards(GqlAuthGuard)
  async createVet(
    @Args('vetInput') vetInput: VetInput,
    @GqlCurrentUser() user: UserType,
  ) {
    return await this.vetService.create(vetInput, user.id);
  }
}
