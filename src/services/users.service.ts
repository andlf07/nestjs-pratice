import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { Validate } from './auth.service';
import { PrismaService } from './prisma.service';

//This service is for manage de User model CRUD basic
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(data: Prisma.UserWhereInput): Promise<User | null> {
    try {
      const getUser = await this.prisma.user.findFirst({
        where: data,
        include: {
          posts: true,
        },
      });
      return getUser;
    } catch (error) {
      throw new Error('Error on the service');
    }
  }
  async findAll(): Promise<User[]> {
    try {
      const getAll = await this.prisma.user.findMany();
      return getAll;
    } catch (error) {
      throw new Error('Error on the service');
    }
  }
  async create(data: Prisma.UserCreateInput): Promise<User> {
    try {
      const createUser = await this.prisma.user.create({
        data,
      });
      return createUser;
    } catch (error) {
      throw new Error('Error on the service');
    }
  }
  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    try {
      const { where, data } = params;
      const updateUser = await this.prisma.user.update({
        data,
        where,
      });
      return updateUser;
    } catch (error) {
      throw new Error('Error on the service');
    }
  }
  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    try {
      const deleteUser = await this.prisma.user.delete({
        where,
      });
      return deleteUser;
    } catch (error) {
      throw new Error('Error on the service');
    }
  }
  async auth(data: Validate): Promise<User | null> {
    try {
      const authUser = await this.prisma.user.findFirst({
        where: data,
      });
      return authUser;
    } catch (error) {
      console.log(error);
      throw new Error('Error on the service');
    }
  }
}
