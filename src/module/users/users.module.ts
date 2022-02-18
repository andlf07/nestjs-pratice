import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { UsersService } from '../../services/users.service';

@Module({
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
