import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { VetModel, Vet } from './models';
import { CreateVet, VetResponse, UpdateVet } from './dto';
import { VetInput, UpdateVetInput } from './inputs';
import { plainToClass } from 'class-transformer';
import { UsersService } from '../users/users.service';
import { ConfigService } from '../config';
import { PetTypeEnum } from '../pets/models';

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
      .populate('user')
      .exec();
  }

  async findById(id: string): Promise<DocumentType<Vet>> {
    return await this.vetModel
      .findById(id)
      .populate('user')
      .exec();
  }

  async findBySpecialties(
    specialties: PetTypeEnum[],
    limit: number = this.limit,
    skip: number = this.skip,
  ): Promise<DocumentType<Vet>[]> {
    return await this.vetModel
      .find({ specialties: { $in: specialties } })
      .populate('user')
      .limit(limit)
      .skip(skip);
  }

  async findOne(filter = {}): Promise<DocumentType<Vet>> {
    return await this.vetModel
      .findOne(filter)
      .populate('user')
      .exec();
  }

  async create(
    dto: CreateVet | VetInput,
    user?: string,
  ): Promise<DocumentType<Vet>> {
    if (!dto && !user) {
      throw new BadRequestException('User required');
    }

    const userResponse = await this.userService.findById(user);
    dto.user = userResponse.id;
    const vet = await (await this.vetModel.create(dto))
      .populate('user')
      .execPopulate();
    return vet;
  }

  async update(
    id: string,
    dto: UpdateVet | UpdateVetInput,
    user: string,
  ): Promise<DocumentType<Vet>> {
    // const vet = await this.vetModel.findByIdAndUpdate(id, dto).exec();
    const vet = await this.vetModel.findById(id).exec();
    if (!vet) {
      throw new NotFoundException('Vet not found');
    }
    // @ts-ignore
    if (vet.user !== user) {
      throw new ForbiddenException();
    }
    await vet.update(dto).exec();
    return vet;
  }

  async delete(id: string, user: string): Promise<void> {
    const vet = await this.vetModel.findById(id).exec();
    if (!vet) {
      throw new NotFoundException('Vet not found');
    }
    // @ts-ignore
    if (vet.user !== user) {
      throw new ForbiddenException();
    }
    await this.vetModel.findByIdAndDelete(id);
  }
}
