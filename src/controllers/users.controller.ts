import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from '../services/users.service';

export interface ReturnJSON {
  message: string;
  code: number;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
}

interface ReturnUserJSON extends ReturnJSON {
  users?: User[];
  user?: User;
}
//In the decorator @Controller we can specify the main endpoint will use this controller
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  //Endpoint for get all users
  @UseGuards(JwtAuthGuard)
  @Get()
  async get(): Promise<ReturnUserJSON> {
    try {
      const findAll = await this.usersService.findAll();
      return {
        code: 200,
        message: 'OK',
        users: findAll,
      };
    } catch (error) {
      return {
        code: 500,
        message: 'INTERNAL_ERROR',
      };
    }
  }
  //Create users with the data from de payload
  @Post()
  async create(@Body() payload: CreateUserPayload): Promise<ReturnUserJSON> {
    try {
      const createUser = await this.usersService.create(payload);
      return {
        code: 201,
        message: 'OK',
        user: createUser,
      };
    } catch (error) {
      return {
        code: 500,
        message: 'INTERNAL_ERROR',
      };
    }
  }
  //Update users with the data from de payload and the id of the users in params
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() payload: CreateUserPayload,
  ): Promise<ReturnUserJSON> {
    try {
      const updateUser = await this.usersService.update({
        where: { id: Number(id) },
        data: payload,
      });
      if (updateUser === null) {
        return {
          code: 404,
          message: 'NOTFOUND',
        };
      }
      return {
        code: 200,
        message: 'UPDATE',
        user: updateUser,
      };
    } catch (error) {
      return {
        code: 500,
        message: 'INTERNAL_ERROR',
      };
    }
  }
  //Delete users id in params
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<ReturnUserJSON> {
    try {
      await this.usersService.delete({ id: Number(id) });
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
  //Get one single users
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<ReturnUserJSON> {
    try {
      const getOne = await this.usersService.findOne({ id: Number(id) });

      if (getOne === null) {
        return {
          code: 404,
          message: 'NOTFOUND',
        };
      }
      return {
        code: 200,
        message: 'OK',
        user: getOne,
      };
    } catch (error) {
      return {
        code: 500,
        message: 'INTERNAL_ERROR',
      };
    }
  }
}
