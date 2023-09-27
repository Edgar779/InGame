import { ISanitize } from '../util';
import { UserDTO } from './dto';
import { IUser } from './interface';

export class UserSanitizer implements ISanitize {
  sanitize(user: IUser): UserDTO {
    const sanitizedUser: UserDTO = {
      id: user.id,
      auth: user.auth,
      name: user.name,
      birthdayDate: user.birthdayDate,
      books: user.books
    };
    return sanitizedUser;
  }

  sanitizeMany(users: IUser[]): UserDTO[] {
    const sanitizedUsers: UserDTO[] = [];
    for (let i = 0; i < users.length; i++) {
      sanitizedUsers.push(this.sanitize(users[i]));
    }
    return sanitizedUsers;
  }
}
