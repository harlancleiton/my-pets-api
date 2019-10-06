import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { PetType } from './types';
import { PetInput } from './inputs';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards';
import { GqlCurrentUser } from '../auth/decorators';
import { UserType } from '../users/types';
import { ID } from 'type-graphql';

@Resolver('Pets')
export class PetsResolver {
  constructor(private readonly petService: PetsService) {}

  @Query(() => PetType)
  @UseGuards(GqlAuthGuard)
  async pet(@Args('id') id: string, @GqlCurrentUser() user: UserType) {
    return await this.petService.findById(id, user.id);
  }

  @Query(() => [PetType])
  @UseGuards(GqlAuthGuard)
  async pets(@GqlCurrentUser() user: UserType) {
    return await this.petService.findAll(user.id);
  }

  @Mutation(() => PetType)
  @UseGuards(GqlAuthGuard)
  async createPet(
    @Args('petInput') petInput: PetInput,
    @GqlCurrentUser() user: UserType,
  ) {
    return await this.petService.create(petInput, user.id);
  }

  @Mutation(() => ID)
  @UseGuards(GqlAuthGuard)
  async updatePet(
    @Args('id') id: string,
    @Args('petInput') petInput: PetInput,
    @GqlCurrentUser() user: UserType,
  ) {
    return (await this.petService.update(id, petInput)).id;
  }

  @Mutation(() => ID)
  @UseGuards(GqlAuthGuard)
  async deletePet(@Args('id') id: string, @GqlCurrentUser() user: UserType) {
    await this.petService.delete(id, user.id);
    return id;
  }
}
