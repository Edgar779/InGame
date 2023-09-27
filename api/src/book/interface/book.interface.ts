import { Document } from "mongoose";
import { IUser } from "src/user/interface";

export interface IBook extends Document {
  name: string;
  authors: IUser['_id'];
  genre: string;
  publishDate: Date;
  editor: string;
}
