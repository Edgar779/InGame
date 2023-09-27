import { ApiProperty } from "@nestjs/swagger";
import { UserDTO } from "src/user/dto";

export class BookDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  authors: UserDTO[];
  @ApiProperty()
  genre: string;
  @ApiProperty()
  publishDate: Date;
  @ApiProperty()
  editor: string;
}
