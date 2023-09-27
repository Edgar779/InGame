import { model, Schema, Types } from "mongoose";
import { Role } from "../auth";
import { IUser } from "./interface";

const userSchema = new Schema(
  {
    auth: { type: Types.ObjectId, ref: 'auth' },
    name: { type: String, unique: true },
    birthdayDate: { type: String },
    role: { type: String, enum: [Role] },
    books: [{ type: Types.ObjectId, ref: "book" }],
  },
  { timestamps: true }
);
export const UserModel = model<IUser>("user", userSchema);
