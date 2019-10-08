import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { VetsService } from './vets.service';
import { VetType } from './types';
import { GqlAuthGuard } from '../auth/guards';
import { VetInput, UpdateVetInput } from './inputs';
import { GqlCurrentUser } from '../auth/decorators';
import { UserType } from '../users/types';
import { ID } from 'type-graphql';
import { plainToClass } from 'class-transformer';
import { VetResponse } from './dto';

@Resolver('Vets')
export class VetsResolver {
  constructor(private readonly vetService: VetsService) {}

  @Mutation(() => VetType)
  @UseGuards(GqlAuthGuard)
  async createVet(
    @Args('vetInput') vetInput: VetInput,
    @GqlCurrentUser() user: UserType,
  ) {
    const vet = await this.vetService.create(vetInput, user.id);
    return plainToClass(VetType, vet.toJSON());
  }

  @Query(() => [VetType])
  @UseGuards(GqlAuthGuard)
  // TODO paginate
  async vets() {
    const vets = await this.vetService.findAll();
    return plainToClass(VetResponse, vets);
  }

  @Query(() => VetType)
  @UseGuards(GqlAuthGuard)
  async vet(@Args('id') id: string) {
    const vet = await this.vetService.findById(id);
    return plainToClass(VetType, vet.toJSON());
  }

  @Mutation(() => ID)
  @UseGuards(GqlAuthGuard)
  async updateVet(
    @Args('id') id: string,
    @Args('updateVet') updateVet: UpdateVetInput,
    @GqlCurrentUser() user: UserType,
  ) {
    const vet = await this.vetService.update(id, updateVet, user.id);
    return vet.id;
  }

  @Mutation(() => ID)
  @UseGuards(GqlAuthGuard)
  async deleteVet(@Args('id') id: string, @GqlCurrentUser() user: UserType) {
    await this.vetService.delete(id, user.id);
    return id;
  }
}
