import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from '../services/users.service';

interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
}

interface ReturnUserJSON {
  message: string;
  code: number;
  users?: User[];
  user?: User;
}
//In the decorator @Controller we can specify the main endpoint will use this controller
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  //Endpoint for get all users
  @Get()
  async get(): Promise<ReturnUserJSON> {
    const findAll = await this.usersService.findAll();
    return {
      code: 200,
      users: findAll,
      message: 'OK',
    };
  }
  //Create users with the data from de payload
  @Post()
  async create(@Body() payload: CreateUserPayload): Promise<ReturnUserJSON> {
    const createUser = await this.usersService.create(payload);
    return {
      user: createUser,
      message: 'OK',
      code: 201,
    };
  }
  //Update users with the data from de payload and the id of the users in params
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() payload: CreateUserPayload,
  ): Promise<ReturnUserJSON> {
    const updateUser = await this.usersService.update({
      where: { id: Number(id) },
      data: payload,
    });
    return {
      message: 'UPDATE',
      user: updateUser,
      code: 200,
    };
  }
  //Delete users id in params
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<ReturnUserJSON> {
    await this.usersService.delete({ id: Number(id) });
    return {
      message: 'DELETE',
      code: 200,
    };
  }
  //Get one single users
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<ReturnUserJSON> {
    const getOne = await this.usersService.findOne({ id: Number(id) });

    if (getOne === null) {
      return {
        message: 'NOTFOUND',
        code: 204,
      };
    }
    return {
      message: 'OK',
      code: 200,
      user: getOne,
    };
  }
}
