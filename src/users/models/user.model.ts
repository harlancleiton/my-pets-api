import {
  prop,
  getModelForClass,
  arrayProp,
  modelOptions,
} from '@typegoose/typegoose';
import { Exclude } from 'class-transformer';
import { UserRole } from './user-role.enum';

@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @prop()
  name: string;

  @prop({ unique: true })
  email: string;

  @prop()
  @Exclude()
  password: string;

  @arrayProp({ items: String, enum: UserRole, default: [UserRole.USER] })
  roles: UserRole[];
}

export const UserModel = getModelForClass(User);
