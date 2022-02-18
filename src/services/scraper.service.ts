import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { PostsService } from './posts.service';
import { UsersService } from './users.service';

@Injectable()
export class ScraperService {
  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
  ) {}

  async filterPostsAndSave(data: Array<[]>) {
    const catergoryArray = ['innovation', 'international-logistics'];
    try {
      const filterData = data.map(async (article: any) => {
        const includesCategory = catergoryArray.includes(article.category);
        if (includesCategory) {
          const getAuthorIdByName = await this.usersService.findOne({
            name: article.authorId,
          });
          getAuthorIdByName != null
            ? (article.authorId = getAuthorIdByName.id)
            : 'No';
          const createPost = await this.postsService.create(article);
          return createPost;
          console.log(article);
        }
      });
      return filterData;
    } catch (error) {
      throw new Error('Error on scraper service');
    }
  }

  //Start the scraper
  async controller() {
    try {
      const browser = await puppeteer.launch();
      return await this.pageScraper(browser);
    } catch (err) {
      console.log('Could not resolve the browser instance => ', err);
    }
  }
  //Go to the page, search for the data, analize de DOM rendered
  async pageScraper(browser): Promise<any> {
    try {
      const URL = 'https://cargofive.com/blog/';
      const page = await browser.newPage();
      console.log(`Navigating to ${URL}...`);
      // Navigate to the selected page
      await page.goto(URL);
      // Wait for the required DOM to be rendered
      await page.waitForSelector(
        'div.ocm-effect-wrap > div.ocm-effect-wrap-inner',
      );
      await page.$('#ajax-content-wrap');
      //go down for get more articles
      await this.autoScroll(page);

      // Get the information in every article
      const articles = await page.$$eval(
        'div.container-wrap > div.main-content > div.row > div > div > div > div > div.wpb_wrapper > div.row > div.post-area > div.posts-container > article > div.inner-wrap > div.post-content > div.article-content-wrap  > div.post-content-wrap',
        async (e) => {
          // We have to map the array of articles and search one by one the data we need
          const article = e.map((ar) => {
            const source_link = ar.querySelector('a.entire-meta-link').href;
            const category = ar.querySelector(
              'span.meta-category > a',
            ).className;
            const title = ar
              .querySelector('div.post-header > h3.title > a')
              .innerHTML.trim();
            const authorId = ar.querySelector(
              'div.grav-wrap > div.text > a',
            ).innerHTML;

            const published_at = ar.querySelector(
              'div.grav-wrap > div.text > span',
            ).textContent;
            const body_description =
              ar.querySelector('div.excerpt').textContent;
            return {
              title,
              body_description,
              authorId,
              published_at,
              category,
              source_link,
            };
          });

          return article;
        },
      );
      await browser.close();
      return articles;
    } catch (error) {}
  }
  //This method is for scroll the page an load more articles
  async autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalHeight += distance + 50;
        }, 100);
        setTimeout(() => {
          clearInterval(timer);
          resolve('Resolve');
        }, 10000);
      });
    });
  }
}
