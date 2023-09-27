import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayMinSize,
  IsDateString,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from "class-validator";
import { DTO } from "src/util";
// import { FileDTO } from 'src/components/file';

export class CreateUserDTO extends DTO {
  @ApiProperty({
    type: String,
    description: "Lenght must be min 3 characters long",
  })
  @MinLength(2)
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  birthdayDate: Date;
  @ApiProperty({
    type: String,
    description:
      "must be at least 8 characters long, contain 1 uppercase 1 lowercase",
  })
  @MinLength(8)
  @MaxLength(30)
  password: string;
}

export class AddBooksDTO extends DTO {
  @ApiProperty()
  @ArrayMinSize(1)
  @IsNotEmpty()
  bookIds: string[];
}
