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
  next();
})
@pre<User>('findOneAndUpdate', async function(next) {
  this.getUpdate().password = await bcrypt.hash(this.getUpdate().password, 10);
  next();
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
  },
})
export class User {
  @prop({ required: true })
  name: string;

  @prop({ unique: true, required: true })
  email: string;

  @prop({ required: true })
  @Exclude()
  password: string;

  @arrayProp({ items: String, enum: UserRole, default: [UserRole.USER] })
  roles: UserRole[];

  @prop()
  createdAt: Date;

  @prop()
  updatedAt: Date;

  @Exclude()
  get username() {
    return this.email;
  }
}

export const UserModel = getModelForClass(User);
