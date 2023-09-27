import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConnection } from './app.database';

import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user';
import { BookModule } from 'src/book/book.module';
import { GenreModule } from 'src/genre/genre.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    UserModule,
    BookModule,
    GenreModule,
    FileModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseConnection],
})
export class AppModule { }
