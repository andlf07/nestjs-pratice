import { Controller, Get } from '@nestjs/common';
import { ScraperService } from '../services/scraper.service';

@Controller('scraper')
export class ScraperController {
  constructor(private scraperService: ScraperService) {}

  @Get()
  async scraperCargoFive() {
    try {
      //Scrap cargofive blog website and get the data
      const scrap = await this.scraperService.controller();
      const savePosts = await this.scraperService.filterPostsAndSave(scrap);

      return savePosts;
    } catch (error) {
      throw new Error('Error on scraper service');
    }
  }
}
