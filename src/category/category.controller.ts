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
import { CreateCategoryDTO } from './dto/category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('/')
  async createPost(@Res() res, @Body() createCategoryDTO: CreateCategoryDTO) {
    const category = await this.categoryService.createCategory(
      createCategoryDTO,
    );
    return res.status(HttpStatus.OK).json({
      mesage: 'Category Successfully Created',
      data: category,
    });
  }

  @Get('/')
  async getCategories(@Res() res) {
    const categories = await this.categoryService.getCategories();
    res.status(HttpStatus.OK).json({
      data: categories,
    });
  }

  @Get('/:id')
  async getCategory(@Res() res, @Param('id') id) {
    const category = await this.categoryService.getCategory(id);
    if (!category) throw new NotFoundException('Category Does not exists');
    res.status(HttpStatus.OK).json({
      data: category,
    });
  }

  @Delete('/:id')
  async deleteCategory(@Res() res, @Param('id') id) {
    const categoryDeleted = await this.categoryService.deleteCategory(id);
    if (!categoryDeleted)
      throw new NotFoundException('Category Does not exists');
    return res.status(HttpStatus.OK).json({
      messages: 'Product Deleted Succesfully',
      data: categoryDeleted,
    });
  }

  @Put('/:id')
  async updateCategory(
    @Res() res,
    createCategoryDTO: CreateCategoryDTO,
    @Param('id') id,
  ) {
    const updatedCategory = await this.categoryService.updateCategory(
      id,
      createCategoryDTO,
    );
    if (!updatedCategory)
      throw new NotFoundException('Category Does not exists');
    return res.status(HttpStatus.OK).json({
      message: 'Category Updated Succesfully',
      data: updatedCategory,
    });
  }
}
