import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}
  create(description: string) {
    const category = this.repo.create({ description });
    return this.repo.save(category);
  }
  findOne(options: Partial<Category>) {
    return this.repo.findOne(options);
  }

  async update(id: number, attrs: Partial<Category>) {
    const updateCategory = await this.findOne({ id });
    if (!updateCategory) {
      throw new Error('category not found');
    }
    Object.assign(updateCategory, attrs);
  }
}
