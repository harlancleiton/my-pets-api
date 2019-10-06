import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { UserModel, User } from './models';
import { UserRegister } from './dto';
import { UserInput } from './inputs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel.modelName)
    private readonly userModel: ModelType<User>,
  ) {}

  async findById(id: string): Promise<DocumentType<User>> {
    return await this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<DocumentType<User>> {
    return await this.userModel.findOne({ email });
  }

  async findAll(
    skip: number = 0,
    limit: number = 20,
  ): Promise<DocumentType<User>[]> {
    return await this.userModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async create(user: UserRegister | UserInput): Promise<DocumentType<User>> {
    return await this.userModel.create(user);
  }

  async update(
    id: string,
    user: UserRegister | UserInput,
  ): Promise<DocumentType<User>> {
    return await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });
  }
}
