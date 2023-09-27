import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { SignedInDTO } from "../auth/dto";
import { Role } from "../auth";
import { AuthService } from "../auth/auth.service";
import { MongooseUtil } from "../util";
import { AddBooksDTO, CreateUserDTO, EditUserDTO, UserDTO } from "./dto";
import { IUser } from "./interface";
import { UserModel } from "./user.model";
import { UserSanitizer } from "./user.sanitizer";

@Injectable()
export class UserService {
  constructor(
    private readonly sanitizer: UserSanitizer,
    private readonly authService: AuthService
  ) {
    this.model = UserModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IUser>;
  private mongooseUtil: MongooseUtil;

  /** Service API */
  /** Used for creating a new user in the system with email and password. @throws if the email is a duplica*/
  async create(dto: CreateUserDTO): Promise<SignedInDTO> {
    try {
      const user = new this.model({
        name: dto.name,
        birthdayDate: dto.birthdayDate,
        role: Role.USER,
      });
      user.auth = user._id;
      await user.save();
      const singedInResponse = await this.authService.create(
        user._id,
        dto.password,
        Role.USER
      );
      return singedInResponse;
    } catch (err) {
      this.mongooseUtil.checkDuplicateKey(err, "User already exists");
      throw err;
    }
  }

  /** only for test */
  async createAdmin(dto: CreateUserDTO) {
    try {
      const user = new this.model({
        name: dto.name,
        birthdayDate: dto.birthdayDate,
        role: Role.USER,
      });
      user.auth = user._id;
      await user.save();
      const singedInResponse = await this.authService.createAdmin(
        user._id,
        dto.password,
        Role.ADMIN
      );
      return singedInResponse;
    } catch (err) {
      this.mongooseUtil.checkDuplicateKey(err, "User already exists");
      throw err;
    }
  }

  /** add books */
  async addBooks(_id: string, dto: AddBooksDTO): Promise<UserDTO> {
    const user = await this.model.findById(_id);
    this.checkUser(user);
    dto.bookIds.forEach((bookId) => {
      if (!user.books.includes(bookId)) {
        user.books.push(bookId);
      }
    });
    await user.save();
    return this.sanitizer.sanitize(user);
  }

  /** delete books */
  async deleteBooks(_id: string, dto: AddBooksDTO): Promise<string> {
    const user = await this.model.updateMany({
      $pull: { books: { $in: dto.bookIds } },
    });
    return "ok";
  }

  /**  Edit the user profile */
  async edit(_id: string, dto: EditUserDTO): Promise<UserDTO> {
    const user = await this.model.findById(_id);
    this.checkUser(user);
    if (dto.name) user.name = dto.name;
    if (dto.birthdayDate) user.birthdayDate = dto.birthdayDate;
    if (dto.role) {
      this.authService.enforceAdmin(dto.user);
      user.role = dto.role;
    }
    return this.sanitizer.sanitize(user);
  }

  /**  Get the user profile */
  async get(_id: string): Promise<UserDTO> {
    const user = await this.model.findById(_id);
    this.checkUser(user);
    return this.sanitizer.sanitize(user);
  }

  /** Get users */
  async getAll(): Promise<UserDTO[]> {
    const users = await this.model.find().populate("books");
    return this.sanitizer.sanitizeMany(users);
  }

  /** Private Methods */
  /** Chack if the user was found */
  private checkUser(user: IUser) {
    if (!user) {
      throw new HttpException("No such user was found", HttpStatus.NOT_FOUND);
    }
  }
}
