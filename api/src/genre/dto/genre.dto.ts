import { ApiProperty } from "@nestjs/swagger";

export class GenreDTO {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
  }
  