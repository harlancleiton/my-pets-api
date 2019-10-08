import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { VetModel, Vet } from './models';
import { CreateVet, VetResponse, UpdateVet } from './dto';
import { VetInput, UpdateVetInput } from './inputs';
import { plainToClass } from 'class-transformer';
import { UsersService } from '../users/users.service';
import { ConfigService } from '../config';
import { PetTypeEnum } from 'src/pets/models';

@Injectable()
export class VetsService {
  private readonly limit: number;
  private readonly skip: number;

  constructor(
    @InjectModel(VetModel.modelName) private readonly vetModel: ModelType<Vet>,
    private readonly userService: UsersService,
    private readonly config: ConfigService,
  ) {
    this.limit = config.paginationLimit;
    this.skip = config.paginationSkip;
  }

  async findAll(
    limit: number = this.limit,
    skip: number = this.skip,
  ): Promise<DocumentType<Vet>[]> {
    return await this.vetModel
      .find()
      .limit(limit)
      .skip(skip)
      .exec();
  }

  async findById(id: string): Promise<DocumentType<Vet>> {
    return await this.vetModel.findById(id).exec();
  }

  async findBySpecialties(
    specialties: PetTypeEnum[],
    limit: number = this.limit,
    skip: number = this.skip,
  ): Promise<DocumentType<Vet>[]> {
    return await this.vetModel
      .find({ specialties })
      .limit(limit)
      .skip(skip);
  }

  async findOne(filter = {}): Promise<DocumentType<Vet>> {
    return await this.vetModel.findOne(filter).exec();
  }

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

  async update(
    id: string,
    dto: UpdateVet | UpdateVetInput,
  ): Promise<DocumentType<Vet>> {
    const vet = await this.vetModel.findByIdAndUpdate(id, dto).exec();
    return vet;
  }
}
