import { Injectable } from '@nestjs/common';
import { Prisma, Posts, User } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}
  async filterAuthorWithPosts(
    category?: string,
    author?: Prisma.UserWhereInput,
  ): Promise<object | null> {
    try {
      const userWithPosts = await this.prisma.posts.findFirst({
        where: {
          category: category,
        },
        include: {
          author: true,
        },
      });
      return userWithPosts;
    } catch (error) {
      console.log(error);
    }
  }
  async findOne(data: any): Promise<Posts | null> {
    try {
      const getPost = await this.prisma.posts.findFirst({
        where: data,
      });
      return getPost;
    } catch (error) {
      throw new Error('Error on service');
    }
  }
  async findAll(): Promise<Posts[]> {
    try {
      const getAll = await this.prisma.posts.findMany();
      return getAll;
    } catch (error) {
      throw new Error('Error on service');
    }
  }
  async create(data: Prisma.PostsCreateInput): Promise<Posts> {
    try {
      const createPost = await this.prisma.posts.create({
        data,
      });
      return createPost;
    } catch (error) {
      console.log(error);
      console.log(error);
      throw new Error('Error on service');
    }
  }
  async update(params: {
    where: Prisma.PostsWhereUniqueInput;
    data: Prisma.PostsUpdateInput;
  }): Promise<Posts> {
    try {
      const { where, data } = params;
      const updatePost = await this.prisma.posts.update({
        data,
        where,
      });
      return updatePost;
    } catch (error) {
      throw new Error('Error on service');
    }
  }
  async delete(where: Prisma.PostsWhereUniqueInput): Promise<Posts> {
    try {
      const deletePost = await this.prisma.posts.delete({
        where,
      });
      return deletePost;
    } catch (error) {
      throw new Error('Error on service');
    }
  }
}
