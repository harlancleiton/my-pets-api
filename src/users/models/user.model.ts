import {
  prop,
  getModelForClass,
  arrayProp,
  modelOptions,
  pre,
} from '@typegoose/typegoose';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { UserRole } from './user-role.enum';

// tslint:disable-next-line: only-arrow-functions
@pre<User>('save', async function(next) {
  // TODO env
  this.password = await bcrypt.hash(this.password, 10);
})
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
