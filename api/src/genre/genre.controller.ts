import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiHeader, ApiOkResponse, ApiTags, ApiBody } from "@nestjs/swagger";
import { ACCESS_TOKEN, ParseObjectIdPipe, Public } from "src/util";
import { CreateGenreDTO, GenreDTO } from "./dto";
import { GenreService } from "./genre.service";

@Controller("genres")
@ApiTags("genre Endpoints")
@ApiHeader({ name: ACCESS_TOKEN })
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  /** Create the genre */
  @Post()
  @ApiBody({ type: CreateGenreDTO })
  @ApiOkResponse({ type: GenreDTO })
  async create(@Body() dto: CreateGenreDTO): Promise<GenreDTO> {
    const genre = await this.genreService.create(dto);
    return genre;
  }

  /** Get all genres by bookId */
  @Get("/books/:bookId")
  @Public()
  @ApiOkResponse({ type: [GenreDTO] })
  async getAll(
    @Param("bookId", ParseObjectIdPipe) bookId: string
  ): Promise<GenreDTO[]> {
    const genres = await this.genreService.getAll(bookId);
    return genres;
  }
}
/** End of Controller */
