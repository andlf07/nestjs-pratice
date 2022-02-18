import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from './users.service';

export interface Validate {
  email: string;
  password: string;
}

export interface DestructuredUser {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: Validate): Promise<DestructuredUser> {
    try {
      const authUser = await this.usersService.auth(data);
      if (authUser && authUser.password === data.password) {
        const { password, ...rest } = authUser;
        // console.log(rest, 'validateuser');
        return rest;
      }
      return null;
    } catch (error) {
      throw new Error('Error on the service');
    }
  }
  async login(data: any): Promise<object | null | string> {
    try {
      const authUser = await this.validateUser(data);
      const { id, email, name } = authUser;
      if (authUser) {
        const payload = {
          email,
          sub: id,
          name,
        };
        return this.jwtService.sign(payload);
      }
      return null;
    } catch (error) {
      throw new Error('Error on service');
    }
  }
}
