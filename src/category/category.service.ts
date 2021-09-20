import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './interfaces/category.interface';
import { CreateCategoryDTO } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private categoryModel: Model<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return await this.categoryModel.find();
  }

  async getCategory(id: string): Promise<Category> {
    return await this.categoryModel.findById(id);
  }

  async createCategory(
    createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    return await new this.categoryModel(createCategoryDTO).save();
  }

  async deleteCategory(id: string): Promise<Category> {
    return await this.categoryModel.findByIdAndDelete(id);
  }

  async updateCategory(
    id: string,
    createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    return await this.categoryModel.findByIdAndUpdate(id, createCategoryDTO, {
      new: true,
    });
  }
}
