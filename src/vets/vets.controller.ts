import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  Put,
  HttpCode,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateVet, VetResponse, UpdateVet } from './dto';
import { CurrentUser } from '../auth/decorators';
import { UserResponse } from '../users/dto';
import { VetsService } from './vets.service';
import { plainToClass } from 'class-transformer';

@Controller('vets')
export class VetsController {
  constructor(private readonly vetService: VetsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async store(
    @Body() createVet: CreateVet,
    @CurrentUser() user: UserResponse,
  ): Promise<VetResponse> {
    const vet = await this.vetService.create(createVet, user.id);
    return plainToClass(VetResponse, vet.toJSON());
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async show(@Param('id') id: string): Promise<VetResponse> {
    const vet = await this.vetService.findById(id);
    return plainToClass(VetResponse, vet.toJSON());
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async index(): Promise<VetResponse[]> {
    const vets = await this.vetService.findAll();
    return plainToClass(VetResponse, vets);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204)
  async update(
    @Param('id') id: string,
    @Body() vet: UpdateVet,
    @CurrentUser() user: UserResponse,
  ): Promise<void> {
    await this.vetService.update(id, vet, user.id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204)
  async destroy(
    @Param('id') id: string,
    @CurrentUser() user: UserResponse,
  ): Promise<void> {
    await this.vetService.delete(id, user.id);
  }
}
