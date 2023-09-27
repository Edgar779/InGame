import { Injectable } from "@nestjs/common";
import { ISanitize } from "src/util";
import { BookDTO } from "./dto";
import { IBook } from "./interface";

@Injectable()
export class BookSanitizer implements ISanitize {
  sanitize(book: IBook): BookDTO {
    const sanitized: BookDTO = {
      id: book.id,
      name: book.name,
      authors: book.authors,
      genre: book.genre,
      publishDate: book.publishDate,
      editor: book.editor,
    };
    return sanitized;
  }

  sanitizeMany(books: IBook[]): BookDTO[] {
    const sanitized: BookDTO[] = [];
    for (let i = 0; i < books.length; i++) {
      sanitized.push(this.sanitize(books[i]));
    }
    return sanitized;
  }
}
