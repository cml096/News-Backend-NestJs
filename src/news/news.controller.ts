import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateNewsDTO } from './dto/news.dto';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Post('/')
  async createNews(@Res() res, @Body() createNewsDTO: CreateNewsDTO) {
    const news = await this.newsService.createNew(createNewsDTO);
    return res.status(HttpStatus.OK).json({
      message: 'News Successfully Created',
      data: news,
    });
  }

  @Get('/')
  async getNews(@Res() res) {
    const news = await this.newsService.getNews();
    res.status(HttpStatus.OK).json({
      data: news,
    });
  }

  @Get('/:id')
  async getNewsById(@Res() res, @Param('id') id) {
    const news = await this.newsService.getNewsById(id);
    if (!news) throw new NotFoundException('News does not exist');
    return res.status(HttpStatus.OK).json({
      data: news,
    });
  }

  @Delete(':id')
  async deleteNews(@Res() res, @Param('id') id) {
    const newsDeleted = await this.newsService.deleteNew(id);
    if (!newsDeleted) throw new NotFoundException('News does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'News Deleted Succesfully',
      data: newsDeleted,
    });
  }

  @Put('/:id')
  async updateNews(@Res() res, createNewsDTO: CreateNewsDTO, @Param('id') id) {
    const updateNews = this.newsService.updateCategory(id, createNewsDTO);
    if (!updateNews) throw new NotFoundException('News does not exist');
    res.status(HttpStatus.OK).json({
      message: 'News Updated Succesfully',
      data: updateNews,
    });
  }
}
