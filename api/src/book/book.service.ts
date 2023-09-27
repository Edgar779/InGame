import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FilterQuery, Model } from "mongoose";
import { Response } from "express";
import {
  CreateBookDTO,
  BookDTO,
  EditBookDTO,
  GetBookQuery,
  AddAuthorsDTO,
} from "./dto";
import { BookModel } from "./book.model";
import { IBook } from "./interface";
import { MongooseUtil } from "../util";
import { BookSanitizer } from "./book.sanitizer";
import { SessionDTO } from "../auth";
import { promises as fs } from "fs";

@Injectable()
export class BookService {
  constructor(private readonly sanitizer: BookSanitizer) {
    this.mongooseUtil = new MongooseUtil();
    this.model = BookModel;
  }
  //The Model
  private model: Model<IBook>;
  mongooseUtil: MongooseUtil;

  /************************** Service API *************************/
  /** Create a new book */
  async create(dto: CreateBookDTO): Promise<BookDTO> {
    try {
      let book: IBook = new this.model({
        name: dto.name,
        authors: dto.authors,
        genre: dto.genre,
        publishDate: dto.publishDate,
        editor: dto.editor,
      });
      await book.save();
      return this.sanitizer.sanitize(book);
    } catch (err) {
      this.mongooseUtil.checkDuplicateKey(err, "Book with this name exists");
      throw err;
    }
  }

  /** add authors */
  async addAuthors(_id: string, dto: AddAuthorsDTO): Promise<BookDTO> {
    const book = await this.model.findById(_id);
    this.checkBook(book);
    dto.authorIds.forEach((authorId) => {
      if (!book.authors.includes(authorId)) {
        book.authors.push(authorId);
      }
    });
    await book.save();
    return this.sanitizer.sanitize(book);
  }

  /** delete books */
  async deleteAuthors(_id: string, dto: AddAuthorsDTO): Promise<string> {
    const user = await this.model.updateMany({
      $pull: { authors: { $in: dto.authorIds } },
    });
    return "ok";
  }

  /** edit the book */
  async edit(_id: string, dto: EditBookDTO): Promise<BookDTO> {
    try {
      const book = await this.model.findById(_id);
      this.checkBook(book);
      if (dto.name) book.name = dto.name;
      if (dto.editor) book.editor = dto.editor;
      if (dto.publishDate) book.publishDate = dto.publishDate;
      if (dto.genre) book.genre = dto.genre;
      await book.save();
      return this.sanitizer.sanitize(book);
    } catch (err) {
      this.mongooseUtil.checkDuplicateKey(err, "Book with this name exists");
      throw err;
    }
  }

  /** get all books */
  async getAll(dto: GetBookQuery): Promise<BookDTO[]> {
    const query: FilterQuery<IBook> = {};
    if (dto.ids && dto.ids.length) query._id = { $in: dto.ids };
    console.log(query);
    const books = await this.model
      .find(query)
      .populate("authors")
      .populate("genre");
    return this.sanitizer.sanitizeMany(books);
  }

  /** edit the book */
  async getById(id: string): Promise<BookDTO> {
    const book = await this.model.findById(id);
    this.checkBook(book);
    return this.sanitizer.sanitize(book);
  }

  /** delete the book */
  async delete(_id: string, user: SessionDTO): Promise<string> {
    const book = await this.model.findById(_id);
    this.checkBook(book);
    await book.remove();
    return _id;
  }

  /** download the file */
  async download(_id: string, res: Response) {
    const book = await this.model.findById(_id);
    this.checkBook(book);
    const paths = process.cwd() + "/src/views/Book.txt";
    await fs.writeFile(paths, JSON.stringify(book));
    res.download(paths);
  }

  /********************** Private Methods **********************/
  /** @throws if the book is undefined */
  private checkBook(book: IBook) {
    if (!book) {
      throw new HttpException("Book was not found", HttpStatus.NOT_FOUND);
    }
  }
}
//End of Service
