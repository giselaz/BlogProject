import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { CommentsService } from 'src/comments/comments.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image) private repo: Repository<Image>,
    private commentsService: CommentsService,
  ) {}
  findOne(options: Partial<Image>) {
    if (!options) {
      return null;
    }
    return this.repo.findOne(options, {
      relations: ['user', 'comments'],
    });
  }
  async create(name: string, description: string, user: User) {
    if (await this.findOne({ name })) {
      throw new BadRequestException('Image already exists');
    }
    const newImage = this.repo.create({ name, description, user });
    return this.repo.save(newImage);
  }

  // find(name: string) {
  //   return this.repo.find({ name });
  // }
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

  async find(image: Image) {
    return await this.repo.find({
      relations: ['user'],
    });
  }
}
