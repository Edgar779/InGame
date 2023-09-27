import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../util/constants';
import { ParseObjectIdPipe } from '../util';
import { AddBooksDTO, CreateUserDTO, EditUserDTO, UserDTO } from './dto';
import { UserService } from './user.service';
import { Public } from 'src/util/decorators/public.decorator';
import { SessionDTO, SignedInDTO } from '../auth/dto';

@Controller('users')
@ApiTags('User')
@ApiHeader({ name: ACCESS_TOKEN })
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  /** Create a new user */
  @Post()
  @Public()
  @ApiBody({ type: CreateUserDTO })
  @ApiOkResponse({ type: SignedInDTO })
  async register(@Body() dto: CreateUserDTO): Promise<SignedInDTO> {
    const auth = await this.userService.create(dto);
    return auth;
  }

  /** Create a new admin for testing */
  @Post('admin')
  @Public()
  @ApiBody({ type: CreateUserDTO })
  @ApiOkResponse({ type: SignedInDTO })
  async createAdmin(@Body() dto: CreateUserDTO): Promise<SignedInDTO> {
    const auth = await this.userService.createAdmin(dto);
    return auth;
  }

  @Patch(":id")
  @ApiBody({ type: EditUserDTO })
  @ApiOkResponse({ type: UserDTO })
  async edit(@Param('id') id: string, @Body() editDTO: EditUserDTO): Promise<UserDTO> {
    const user = await this.userService.edit(id, editDTO);
    return user;
  }

  @Patch(":id/books/add")
  @ApiBody({ type: AddBooksDTO })
  @ApiOkResponse({ type: UserDTO })
  async addBooks(@Param('id') id: string, @Body() dto: AddBooksDTO): Promise<UserDTO> {
    const user = await this.userService.addBooks(id, dto);
    return user;
  }

  /** Delete books */
  @Patch(":id/books/delete")
  @ApiBody({ type: AddBooksDTO })
  @ApiOkResponse({ type: UserDTO })
  async deleteBooks(
    @Param("id", ParseObjectIdPipe) id: string,
    @Body() dto: AddBooksDTO
  ): Promise<string> {
    const book = await this.userService.deleteBooks(id, dto);
    return book;
  }

  /** Get the user */
  @Get('profile')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: UserDTO })
  async getUser(@Body('user') session: SessionDTO): Promise<UserDTO> {
    const user = await this.userService.get(session.id);
    return user;
  }

  /** Get all users */
  @Get()
  @ApiOkResponse({ type: [UserDTO] })
  @Public()
  async getUsers(): Promise<UserDTO[]> {
    const users = await this.userService.getAll();
    return users;
  }



}
