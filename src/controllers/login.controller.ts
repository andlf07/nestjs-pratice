import { Controller } from '@nestjs/common';

//In the decorator @Controller we can specify the main endpoint will use this controller
@Controller('login')
export class LoginController {}
