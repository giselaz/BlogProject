import {
  Body,
  Controller,
  Injectable,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Role } from 'src/role/role.enum';
import RoleGuard from 'src/role/roles.guard';
import { JwtAuthGuards } from 'src/user/auth/jwt-auth.guard';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Controller('category')
@Injectable()
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @UseGuards(JwtAuthGuards, RoleGuard(Role.Admin))
  @Post('')
  async createCategory(@Body() body: Category) {
    return await this.categoryService.create(body.description);
  }
  @UseGuards(JwtAuthGuards, RoleGuard(Role.Admin))
  @Patch('/:id')
  async UpdateCategory(
    @Param('id') id: string,
    @Body() body: Partial<Category>,
  ) {
    return await this.categoryService.update(parseInt(id), body);
  }
}
