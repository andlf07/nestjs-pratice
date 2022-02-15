import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostController } from './controllers/post.controller';
import { UsersController } from './controllers/users.controller';
import { LoginController } from './controllers/login.controller';
import { UsersService } from './services/users.service';
import { LoginService } from './services/login.service';
import { PrismaService } from './services/prisma.service';
import { PostsService } from './services/posts.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    UsersController,
    PostController,
    LoginController,
  ],
  providers: [
    AppService,
    UsersService,
    PostsService,
    LoginService,
    PrismaService,
  ],
})
export class AppModule {}
