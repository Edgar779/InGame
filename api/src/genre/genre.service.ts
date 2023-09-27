import { Injectable } from "@nestjs/common";
import { FilterQuery, Model } from "mongoose";
import { CreateGenreDTO, GenreDTO } from "./dto";
import { GenreModel } from "./genre.model";
import { IGenre } from "./interface";
import { GenreSanitizer } from "./genre.sanitizer";
import { MongooseUtil } from "../util";

@Injectable()
export class GenreService {
  constructor(private readonly sanitizer: GenreSanitizer) {
    this.mongooseUtil = new MongooseUtil();
    this.model = GenreModel;
  }
  mongooseUtil: MongooseUtil;
  private model: Model<IGenre>;

  /************************** Service API *************************/
  /** Create a new book */
  async create(dto: CreateGenreDTO): Promise<GenreDTO> {
    try {
      const genre: IGenre = new this.model({
        name: dto.name,
      });
      await genre.save();
      return this.sanitizer.sanitize(genre);
    } catch (err) {
      this.mongooseUtil.checkDuplicateKey(err, "Genre with this name exists");
      throw err;
    }
  }
  
  /** get all genres by bookId */
  async getAll(bookId: string): Promise<GenreDTO[]> {
    const genres = await this.model.find({ bookId });
    return this.sanitizer.sanitizeMany(genres);
  }
}
