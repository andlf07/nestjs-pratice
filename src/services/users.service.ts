import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from './prisma.service';

//This service is for manage de User model CRUD basic
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findOne(user_id: Prisma.UserWhereUniqueInput): Promise<User | null> {
    const getUser = await this.prisma.user.findUnique({
      where: user_id,
    });
    return getUser;
  }
  async findAll(): Promise<User[]> {
    const getAll = await this.prisma.user.findMany();
    return getAll;
  }
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const createUser = await this.prisma.user.create({
      data,
    });
    return createUser;
  }
  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    const updateUser = await this.prisma.user.update({
      data,
      where,
    });
    return updateUser;
  }
  async delete(where: Prisma.PostWhereUniqueInput): Promise<User> {
    const deleteUser = await this.prisma.user.delete({
      where,
    });
    return deleteUser;
  }
}
