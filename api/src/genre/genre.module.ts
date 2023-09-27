import { Module } from "@nestjs/common";
import { GenreService } from "./genre.service";
import { GenreSanitizer } from "./genre.sanitizer";
import { GenreController } from "./genre.controller";

@Module({
  exports: [GenreService],
  providers: [GenreService, GenreSanitizer],
  controllers: [GenreController],
})
export class GenreModule {}
