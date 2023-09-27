import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayMinSize,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from "class-validator";
import { DTO } from "src/util";

export class CreateBookDTO extends DTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsMongoId()
  @ArrayMinSize(1)
  authors: string[];
  @ApiProperty()
  @IsMongoId()
  genre: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  publishDate: Date;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  editor: string;
}

export class AddAuthorsDTO extends DTO {
  @ApiProperty()
  @ArrayMinSize(1)
  @IsNotEmpty()
  authorIds: string[];
}
