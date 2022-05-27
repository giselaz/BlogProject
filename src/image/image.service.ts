import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { ImageDto } from './dto/image.dto';
import { CommentsService } from 'src/comments/comments.service';
import { User } from 'src/user/user.entity';
// import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image) private repo: Repository<Image>,
    private commentsService: CommentsService,
  ) {}
  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne(id, {
      relations: ['user', 'comments'],
    });
  }
  async create(image: Partial<ImageDto>, user: User) {
    if (await this.repo.findOne({ name: image.name })) {
      throw new BadRequestException('Image already exists');
    }
    const newImage = this.repo.create(image);
    return this.repo.save(newImage);
  }

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
    const imageToDelete = await this.repo.findOne(id);

    if (imageToDelete.comments) {
      for (const comment of imageToDelete.comments) {
        this.commentsService.remove(comment);
      }
    }
    if (!imageToDelete) {
      throw new Error('Image not found');
    }
    return this.repo.delete(imageToDelete);
  }

  // async find(image: Image) {
  //   return await this.repo.find({
  //     relations: ['user'],
  //   });
  // }
}

//
