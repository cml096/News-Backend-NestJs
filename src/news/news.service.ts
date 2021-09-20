import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { News } from './interface/news.interface';
import { CreateNewsDTO } from './dto/news.dto';

@Injectable()
export class NewsService {
  constructor(@InjectModel('News') private newsModel: Model<News>) {}

  async getNews(): Promise<News[]> {
    return await this.newsModel.find();
  }

  async getNewsById(id: string): Promise<News> {
    return await this.newsModel.findById(id);
  }

  async createNew(createNewsDTO: CreateNewsDTO): Promise<News> {
    return await new this.newsModel(createNewsDTO).save();
  }

  async deleteNew(id: string): Promise<News> {
    return await this.newsModel.findByIdAndDelete(id);
  }

  async updateCategory(
    id: string,
    createNewsDTO: CreateNewsDTO,
  ): Promise<News> {
    return await this.newsModel.findByIdAndUpdate(id, createNewsDTO, {
      new: true,
    });
  }
}
