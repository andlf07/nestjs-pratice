import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth/login')
export class LoginController {
  constructor(private authService: AuthService) {}
  //With this decorator we protect our endpoints
  // @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Body() payload: any) {
    try {
      const loginUser = await this.authService.login(payload);
      if (loginUser === null) {
        return {
          code: 200,
          message: 'Wrong password or email',
        };
      }
      return {
        code: 200,
        access_token: loginUser,
      };
    } catch (error) {
      return {
        code: 500,
        message: 'INTERNAL_ERROR',
      };
    }
  }
}
