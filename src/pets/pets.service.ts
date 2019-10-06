import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { plainToClass } from 'class-transformer';
import { ObjectID } from 'bson';
import { PetModel, Pet } from './models';
import { CreatePet, PetResponse } from './dto';
import { PetInput } from './inputs';

@Injectable()
export class PetsService {
  constructor(
    @InjectModel(PetModel.modelName) private readonly petModel: ModelType<Pet>,
  ) {}

  async findById(
    id: string | ObjectID,
    user: string | ObjectID,
  ): Promise<PetResponse> {
    const pet = await this.petModel.findById(id).exec();
    if (!pet) {
      throw new HttpException('Pet not found', HttpStatus.NOT_FOUND);
    }
    // tslint:disable-next-line: triple-equals
    if (pet.user != user) {
      throw new HttpException('Denied access', HttpStatus.FORBIDDEN);
    }
    return plainToClass(PetResponse, pet.toJSON());
  }

  async create(
    createPet: CreatePet | PetInput,
    user: string | ObjectID,
  ): Promise<PetResponse> {
    const pet = await this.petModel.create(Object.assign(createPet, { user }));
    return plainToClass(PetResponse, pet.toJSON());
  }

  async update(
    id: string | ObjectID,
    pet: CreatePet | PetInput,
  ): Promise<PetResponse> {
    // TODO user verify
    const petUpdated = await this.petModel.findByIdAndUpdate(id, pet).exec();
    return plainToClass(PetResponse, petUpdated.toJSON());
  }

  async findAll(user: string | ObjectID): Promise<PetResponse[]> {
    // TODO paginate
    const pets = await this.petModel.find({ user }).exec();
    return plainToClass(PetResponse, pets);
  }

  async delete(id: string | ObjectID, user: string | ObjectID) {
    const pet = await this.petModel.findById(id).exec();
    if (!pet) {
      throw new HttpException('Pet not found', HttpStatus.NOT_FOUND);
    }
    // tslint:disable-next-line: triple-equals
    if (pet.user != user) {
      throw new HttpException('Denied access', HttpStatus.FORBIDDEN);
    }
    return await pet.remove();
  }
}
