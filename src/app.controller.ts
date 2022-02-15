import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('new')
  newEndpoint() {
    return 'Hihoho';
  }
  @Get('products/:productId')
  //Indicando en el decorador params el parametro productId, especificamos el parametro y podemos tiparlo de una manera mas limpia
  getProduct(@Param('productId') productId: string) {
    return `product ${productId}`;
  }
}
