import { Module } from "@nestjs/common";
import { BookController } from "./book.controller";
import { BookSanitizer } from "./book.sanitizer";
import { BookService } from "./book.service";

@Module({
  exports: [BookService],
  providers: [BookService, BookSanitizer],
  controllers: [BookController],
})
export class BookModule {}
