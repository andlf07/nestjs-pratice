import { Injectable } from '@nestjs/common';
import { Prisma, Post } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}
  async findOne(post_id: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    const getPost = await this.prisma.post.findUnique({
      where: post_id,
    });
    return getPost;
  }
  async findAll(): Promise<Post[]> {
    const getAll = await this.prisma.post.findMany();
    return getAll;
  }
  async create(data: Prisma.PostCreateInput): Promise<Post> {
    const createPost = await this.prisma.post.create({
      data,
    });
    return createPost;
  }
  async update(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { where, data } = params;
    const updatePost = await this.prisma.post.update({
      data,
      where,
    });
    return updatePost;
  }
  async delete(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    const deletePost = await this.prisma.post.delete({
      where,
    });
    return deletePost;
  }
}
