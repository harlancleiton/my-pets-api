import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
  arrayProp,
} from '@typegoose/typegoose';
import { User } from '../../users/models';
import { PetTypeEnum } from '../../pets/models';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
  },
})
export class Vet {
  @prop({ trim: true, maxlength: 256 })
  bio: string;

  @prop({ ref: User, required: true, unique: true })
  user: Ref<User>;

  @arrayProp({ items: String, enum: PetTypeEnum })
  specialties: PetTypeEnum[];

  @prop({ required: true, default: true })
  active: boolean;

  @prop()
  createdAt: Date;

  @prop()
  updatedAt: Date;
}

export const VetModel = getModelForClass(Vet);
