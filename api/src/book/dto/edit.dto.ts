import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsMongoId, IsOptional, IsString } from "class-validator";
import { DTO } from "src/util";

export class EditBookDTO extends DTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;
  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  genre: string;
  @ApiProperty()
  @IsDateString()
  @IsOptional()
  publishDate: Date;
  @ApiProperty()
  @IsString()
  @IsOptional()
  editor: string;
}
