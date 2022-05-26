import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { User } from 'src/user/user.entity';
import { Category } from 'src/category/category.entity';
// import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ImageService {
  constructor(@InjectRepository(Image) private repo: Repository<Image>) {}

  async create(name: string, user: User, categories: Category[]) {
    // const category = await this.categoryService.findOne(categories);
    // if (!category) {
    //   throw new NotFoundException('category not found');
    // }
    console.log(categories);
    console.log(user);
    const image = this.repo.create({
      name,
      user,
      // categories,
    });
    return this.repo.save(image);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne(id);
  }
  // , {
  //   relations: ['user'],
  // }
  // find(name: string) {
  //   return this.repo.find({ name });
  // }
  async Update(id: number, attrs: Partial<Image>) {
    const updatedImage = await this.repo.findOne(id);
    if (!updatedImage) {
      throw new Error('image not found');
    }
    Object.assign(updatedImage, attrs);
    return this.repo.save(updatedImage);
  }
  async delete(id: number) {
    const ImageToDelete = await this.repo.findOne(id);
    if (!ImageToDelete) {
      throw new Error('Image not found');
    }
    return this.repo.delete(id);
  }

  // async find(image: Image) {
  //   return await this.repo.find({
  //     relations: ['user'],
  //   });
  // }
}

//
