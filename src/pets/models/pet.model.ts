import {
  prop,
  getModelForClass,
  modelOptions,
  Ref,
} from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { Gender } from '../../shared/models';
import { User, UserModel } from '../../users/models';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
  },
})
export class Pet {
  @prop({ required: true })
  name: string;

  @prop({ maxlength: 300 })
  bio: string;

  @prop({ enum: Gender, required: true })
  gender: Gender;

  @prop({ min: 0 })
  age: number;

  @prop({ required: true, default: 'Lorem Ipsum' })
  breed: string;

  @prop({ ref: User })
  user: Ref<User>;

  @prop({ min: 0, required: true })
  weight: number;

  @prop({ required: true })
  createdAt: Date;

  @prop({ required: true })
  updatedAt: Date;
}

export const PetModel = getModelForClass(Pet);
