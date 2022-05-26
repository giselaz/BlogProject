import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { create } from 'domain';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}
  create(description: string) {
    const category = this.repo.create({ description });
    return this.repo.save(category);
  }
  findOne(id: number) {
    return this.repo.findOne(id);
  }
}
