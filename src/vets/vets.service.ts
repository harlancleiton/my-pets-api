import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { VetModel, Vet } from './models';
import { CreateVet, VetResponse } from './dto';
import { VetInput } from './inputs';
import { plainToClass } from 'class-transformer';
import { UsersService } from '../users/users.service';

@Injectable()
export class VetsService {
  constructor(
    @InjectModel(VetModel.modelName) private readonly vetModel: ModelType<Vet>,
    private readonly userService: UsersService,
  ) {}

  async create(dto: CreateVet | VetInput, user?: string): Promise<VetResponse> {
    if (!dto && !user) {
      throw new BadRequestException('User required');
    }

    const userResponse = await this.userService.findById(user);
    dto.user = userResponse.id;
    const vet = await (await this.vetModel.create(dto))
      .populate('user')
      .execPopulate();
    return plainToClass(VetResponse, vet.toJSON());
  }
}
