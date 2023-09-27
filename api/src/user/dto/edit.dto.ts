import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, Length } from 'class-validator';
import { Role, SessionDTO } from '../../auth';
import { DTO } from 'src/util';

export class EditUserDTO extends DTO {
  @ApiProperty()
  @IsOptional()
  @Length(2, 20)
  name?: string;
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  birthdayDate: Date;
  @ApiProperty()
  @IsEnum(Role)
  @IsOptional()
  role: Role;
  /** Set by the system */
  user?: SessionDTO;
}
