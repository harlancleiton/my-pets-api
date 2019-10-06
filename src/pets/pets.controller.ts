import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePet, PetResponse } from './dto';
import { CurrentUser } from '../auth/decorators';
import { UserResponse } from '../users/dto';
import { PetsService } from './pets.service';
import { plainToClass } from 'class-transformer';

@Controller('pets')
export class PetsController {
  constructor(private readonly petService: PetsService) {}

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async show(@Param('id') id: string, @CurrentUser() user: UserResponse) {
    return await this.petService.findById(id, user.id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async store(@Body() createPet: CreatePet, @CurrentUser() user: UserResponse) {
    return await this.petService.create(createPet, user.id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async index(@CurrentUser() user: UserResponse) {
    return await this.petService.findAll(user.id);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string, @CurrentUser() user: UserResponse) {
    await this.petService.delete(id, user.id);
  }
}
