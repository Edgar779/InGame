import { Injectable } from "@nestjs/common";
import { ISanitize } from "src/util";
import { GenreDTO } from "./dto";
import { IGenre } from "./interface";

@Injectable()
export class GenreSanitizer implements ISanitize {
  sanitize(genre: IGenre): GenreDTO {
    const sanitized: GenreDTO = {
      id: genre.id,
      name: genre.name,
    };
    return sanitized;
  }

  sanitizeMany(genres: IGenre[]): GenreDTO[] {
    const sanitized: GenreDTO[] = [];
    for (let i = 0; i < genres.length; i++) {
      sanitized.push(this.sanitize(genres[i]));
    }
    return sanitized;
  }
}
