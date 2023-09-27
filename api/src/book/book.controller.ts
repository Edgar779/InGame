import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  Query,
  Res,
} from "@nestjs/common";
import { ApiBody, ApiHeader, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ACCESS_TOKEN, ParseObjectIdPipe, Public } from "src/util";
import {
  AddAuthorsDTO,
  BookDTO,
  CreateBookDTO,
  EditBookDTO,
  GetBookQuery,
} from "./dto";
import { BookService } from "./book.service";
import { SessionDTO } from "../auth";
import { Response } from "express";

@Controller("books")
@ApiTags("Book Endpoints")
@ApiHeader({ name: ACCESS_TOKEN })
export class BookController {
  constructor(private readonly bookService: BookService) {}

  /** Create the book */
  @Post()
  @ApiBody({ type: CreateBookDTO })
  @ApiOkResponse({ type: BookDTO })
  async create(@Body() dto: CreateBookDTO): Promise<BookDTO> {
    const book = await this.bookService.create(dto);
    return book;
  }

  /** Add authors */
  @Patch(":id/user/add")
  @ApiBody({ type: AddAuthorsDTO })
  @ApiOkResponse({ type: BookDTO })
  async addAuthors(
    @Param("id", ParseObjectIdPipe) id: string,
    @Body() dto: AddAuthorsDTO
  ): Promise<BookDTO> {
    const book = await this.bookService.addAuthors(id, dto);
    return book;
  }

  /** Delete authors */
  @Patch(":id/user/delete")
  @ApiBody({ type: AddAuthorsDTO })
  @ApiOkResponse({ type: BookDTO })
  async deleteAuthors(
    @Param("id", ParseObjectIdPipe) id: string,
    @Body() dto: AddAuthorsDTO
  ): Promise<string> {
    const book = await this.bookService.deleteAuthors(id, dto);
    return book;
  }

  /** Update the book fields */
  @Patch(":id")
  @ApiBody({ type: EditBookDTO })
  @ApiOkResponse({ type: BookDTO })
  async editMenu(
    @Param("id", ParseObjectIdPipe) id: string,
    @Body() dto: EditBookDTO
  ): Promise<BookDTO> {
    const book = await this.bookService.edit(id, dto);
    return book;
  }

  /** Get the book by id */
  @Get(":id")
  @Public()
  @ApiOkResponse({ type: BookDTO })
  async getBusinessMenus(
    @Param("id", ParseObjectIdPipe) id: string
  ): Promise<BookDTO> {
    const book = await this.bookService.getById(id);
    return book;
  }

  /** Get all books */
  @Get()
  @Public()
  @ApiOkResponse({ type: [BookDTO] })
  async getAll(@Query() dto: GetBookQuery): Promise<BookDTO[]> {
    const books = await this.bookService.getAll(dto);
    return books;
  }

  /** Delete a book */
  @Delete(":id")
  @ApiOkResponse({ type: String, description: "Id of the deleted book" })
  async deleteMenu(
    @Param("id", ParseObjectIdPipe) menuId: string,
    @Body("user") user: SessionDTO
  ): Promise<string> {
    const deletedId = await this.bookService.delete(menuId, user);
    return deletedId;
  }

  /** Download the book */
  @Get(":id/download")
  @ApiOkResponse({ type: BookDTO })
  async dowload(
    @Param("id", ParseObjectIdPipe) id: string,
    @Res() res: Response
  ) {
    const book = await this.bookService.download(id, res);
    return book;
  }
}
/** End of Controller */
