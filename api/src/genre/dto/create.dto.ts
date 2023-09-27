import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateGenreDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
  }
  