import { ApiProperty } from '@nestjs/swagger';
import { IAuth } from '../../auth/interface';
import { IBook } from '../../book/interface';

export class UserDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  auth: IAuth['_id'];
  @ApiProperty()
  birthdayDate: Date;
  @ApiProperty()
  books: IBook['_id']
}
