import { Schema, model, Types } from "mongoose";
import { IGenre } from "./interface";

const GenreSchema = new Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

export const GenreModel = model<IGenre>("genre", GenreSchema);
