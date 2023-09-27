import { Schema, model, Types } from "mongoose";
import { IBook } from "./interface";

const BookSchema = new Schema(
  {
    authors: [{ type: Types.ObjectId, ref: "user" }],
    genre: { type: Types.ObjectId, ref: "genre" },
    name: { type: String, unique: true },
    publishDate: { type: Date },
    editor: { type: String },
  },
  { timestamps: true }
);

export const BookModel = model<IBook>("book", BookSchema);
