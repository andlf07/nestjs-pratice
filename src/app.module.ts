import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { PrismaService } from './services/prisma.service';
import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { AuthModule } from './module/auth/auth.module';
import { UsersModule } from './module/users/users.module';
import { LoginController } from './controllers/login.controller';
import { ScraperService } from './services/scraper.service';
import { ScraperController } from './controllers/scraper.controller';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [
    AppController,
    UsersController,
    PostsController,
    LoginController,
    ScraperController,
  ],
  providers: [
    AppService,
    UsersService,
    PostsService,
    PrismaService,
    ScraperService,
  ],
})
export class AppModule {}
