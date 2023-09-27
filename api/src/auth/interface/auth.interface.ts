import { Document } from 'mongoose';
import { AuthStatus, Role } from '../constants';
import { IUser } from 'src/user/interface';

/** Data type is used to descibe the data model of the Auth collection */
export interface IAuth extends Document {
  user: IUser['_id'];
  org: string;
  email: string;
  password?: string;
  googleId?: string;
  twitterId?: string;
  facebookId?: string;
  appleId: string;
  invitation?: boolean;
  sessions: string[];
  role: Role;
  status: AuthStatus;
  /**Mathods */
  comparePassword?: any;
}
