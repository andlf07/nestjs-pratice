import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
} from '@nestjs/common';

interface CreatePostPayload {
  title: string;
  description: string;
  author: string;
  published_at: string;
  category: [];
  source: string;
}

//In the decorator @Controller we can specify the main endpoint will use this controller
@Controller('post')
export class PostController {
  //Get all posts
  @Get()
  async get() {
    return 'wed';
  }
  //Create posts with the data from the payload
  @Post()
  async create(@Body() payload: CreatePostPayload) {
    return {
      payload,
    };
  }
  //Update posts with the data from de payload and the id of the posts in params
  @Put(':id')
  async update(@Param('id') id: number, @Body() payload: CreatePostPayload) {
    return {
      message: 'UPDATE',
      payload,
      id,
    };
  }
  //Delete posts id in params
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return {
      message: 'DELETE',
      id,
    };
  }
  //Get one single posts
  @Get(':id')
  async getOne(@Param('id') id: number) {
    return {
      message: 'OK',
      id,
    };
  }
}
