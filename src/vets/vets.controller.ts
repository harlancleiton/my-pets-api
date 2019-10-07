import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateVet } from './dto';
import { CurrentUser } from '../auth/decorators';
import { UserResponse } from '../users/dto';
import { VetsService } from './vets.service';

@Controller('vets')
export class VetsController {
  constructor(private readonly vetService: VetsService) {}
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async store(@Body() createVet: CreateVet, @CurrentUser() user: UserResponse) {
    const vet = await this.vetService.create(createVet, user.id);
    return vet;
  }
}
