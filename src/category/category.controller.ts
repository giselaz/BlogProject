import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Controller('category')
@Injectable()
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('/newCategory')
  async createCategory(@Body() body: Category) {
    return await this.categoryService.create(body.description);
  }
}
