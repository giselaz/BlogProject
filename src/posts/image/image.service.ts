import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { CommentsService } from '../comments/comments.service';
import { User } from 'src/user/user.entity';
import { Category } from 'src/category/category.entity';
import { CategoryService } from 'src/category/category.service';
import { ImageDto } from './dto/image.dto';
@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image) private repo: Repository<Image>,
    private commentsService: CommentsService,
    private categoryService: CategoryService,
  ) {}
  findOne(options: Partial<Image>) {
    if (!options) {
      return null;
    }
    return this.repo.findOne(options, {
      relations: ['user', 'comments'],
    });
  }

  // async create(image: Partial<Image>, category: Category[]) {
  //   if (await this.findOne({ name: image.name })) {
  //     throw new BadRequestException('Image already exists');
  //   }
  // }

  async create(image: ImageDto, user: User) {
    if (await this.findOne({ name: image.name })) {
      throw new BadRequestException('Image already exists');
    }
    const dbCategories = [];
    for (const category of image.categories) {
      let dbCategory = await this.categoryService.findOne({
        description: category,
      });

      if (!dbCategory) {
        dbCategory = await this.categoryService.create(category);
      }
      dbCategories.push(dbCategory);
    }

    const newImage = this.repo.create({
      name: image.name,
      description: image.description,
      user,
      categories: dbCategories,
    });
    return this.repo.save(newImage);
  }

  find(name: string) {
    return this.repo.find({ name });
  }
  async update(id: number, attrs: Partial<Image>) {
    const updatedImage = await this.repo.findOne(id);
    if (!updatedImage) {
      throw new Error('image not found');
    }
    Object.assign(updatedImage, attrs);
    return this.repo.save(updatedImage);
  }
  async delete(id: number) {
    const imageToDelete = await this.findOne({ id });
    if (imageToDelete.comments) {
      for (const comment of imageToDelete.comments) {
        this.commentsService.remove(comment);
      }
    }
    if (!imageToDelete) {
      throw new Error('Image not found');
    }
    return this.repo.delete(imageToDelete.id);
  }
}
