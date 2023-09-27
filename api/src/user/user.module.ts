import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserSanitizer } from './user.sanitizer';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [UserService, UserSanitizer],
  exports: [UserService],
})
export class UserModule {}
