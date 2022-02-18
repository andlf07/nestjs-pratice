import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Posts, Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/services/users.service';
import { PostsService } from '../services/posts.service';
import { ReturnJSON } from './users.controller';

export interface CreatePostPayload {
  title: string;
  body_description: string;
  author?: Prisma.UserCreateNestedOneWithoutPostsInput;
  published_at: string;
  category: string;
  source_link: string;
}

interface ReturnPostsJSON extends ReturnJSON {
  posts?: Posts[];
  post?: Posts;
}

//In the decorator @Controller we can specify the main endpoint will use this controller
@Controller('api/articles')
export class PostsController {
  constructor(private postsService: PostsService) {}
  //Get all posts
  @UseGuards(JwtAuthGuard)
  @Get(':category')
  async getPostsFilter(@Param('category') category: string) {
    try {
      const getByCategory = await this.postsService.filterAuthorWithPosts(
        category,
      );
      if (getByCategory === null) {
        return {
          code: 404,
          message: 'NOTFOUND',
        };
      }
      return {
        code: 200,
        message: 'OK',
        post: getByCategory,
      };
    } catch (error) {
      return {
        code: 500,
        message: 'INTERNAL_ERROR',
      };
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async get(): Promise<ReturnPostsJSON> {
    try {
      const findAll = await this.postsService.findAll();
      return {
        code: 200,
        posts: findAll,
        message: 'OK',
      };
    } catch (error) {
      return {
        code: 500,
        message: 'INTERNAL_ERROR',
      };
    }
  }
  //Create posts with the data from the payload
  @Post()
  async create(@Body() payload: CreatePostPayload): Promise<ReturnPostsJSON> {
    try {
      const createPost = await this.postsService.create(payload);
      return {
        code: 201,
        message: 'OK',
        post: createPost,
      };
    } catch (error) {
      return {
        code: 500,
        message: 'INTERNAL_ERROR',
      };
    }
  }
  //Update posts with the data from de payload and the id of the posts in params
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() payload: CreatePostPayload,
  ): Promise<ReturnPostsJSON> {
    try {
      const updatePost = await this.postsService.update({
        where: { id: Number(id) },
        data: payload,
      });
      if (updatePost === null) {
        return {
          code: 404,
          message: 'NOTFOUND',
        };
      }
      return {
        code: 200,
        message: 'UPDATE',
        post: updatePost,
      };
    } catch (error) {
      return {
        code: 500,
        message: 'INTERNAL_ERROR',
      };
    }
  }
  //Delete posts id in params
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<ReturnPostsJSON> {
    try {
      await this.postsService.delete({ id: Number(id) });
      return {
        code: 200,
        message: 'DELETE',
      };
    } catch (error) {
      return {
        code: 500,
        message: 'INTERNAL_ERROR',
      };
    }
  }
  //Get one single posts
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<ReturnPostsJSON> {
    try {
      const getOne = await this.postsService.findOne(id);

      if (getOne === null) {
        return {
          code: 404,
          message: 'NOTFOUND',
        };
      }

      return {
        code: 200,
        message: 'OK',
        post: getOne,
      };
    } catch (error) {
      return {
        code: 500,
        message: 'INTERNAL_ERROR',
      };
    }
  }
}
