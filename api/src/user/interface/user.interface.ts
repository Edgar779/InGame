import { Document } from 'mongoose';
import { IAuth } from '../../auth/interface';
import { Role } from '../../auth';

export interface IUser extends Document {
  auth: IAuth['_id'];
  name: string;
  birthdayDate: Date;
  role: Role;
  books: Array<string>;
}
