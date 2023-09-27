import { expect } from "chai";
import { UserService } from "../src/user/user.service";
import { UserSanitizer } from "src/user/user.sanitizer";
import { AuthService } from "src/auth/auth.service";
// import { UserSanitizer } from 'src/user/user.sanitizer';
// import { AuthService } from 'src/auth/auth.service';

describe("UserService", () => {
  let userService: UserService;
  let sanitizer: UserSanitizer;
  let authService: AuthService;
  beforeEach(() => {
    // Create stubs or mock objects for UserSanitizer and AuthService
    sanitizer = {
      /* Implement stubbed methods or mock behavior here */
    } as UserSanitizer;

    authService = {
      /* Implement stubbed methods or mock behavior here */
    } as AuthService;

    // Initialize the UserService or any necessary dependencies
    userService = new UserService(sanitizer, authService);
  });

  it("should return a user by ID", async () => {
    const userId = "6512f42beac189b0e684f48a";
    const user = await userService.get(userId);
    expect(user).to.exist;
    expect(user.id).to.equal(userId);
  });

  // it("should return all users", async () => {
  //   return new Promise((resolve, reject) => {
  //     const users = userService.getAll();
  //     resolve();
  //   });
  //   // const users = await userService.getAll();
  // });

  // Add more test cases as needed
});
