import { Injectable } from '@nestjs/common';
import { Comments } from './comments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Image } from '../image/image.entity';
@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comments) private repo: Repository<Comments>) {}

  findOne(options: Partial<Comments>) {
    return this.repo.findOne(options, {
      relations: ['user', 'image'],
    });
  }
  create(description: string, user: User, image: Image) {
    const comments = this.repo.create({
      description,
      user,
      image,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.repo.save(comments);
  }

  async Update(id: number, attrs: Partial<Comments>) {
    const updatedComment = await this.findOne({ id });
    if (!updatedComment) {
      throw new Error('comment not found');
    }
    updatedComment.updatedAt = new Date();
    Object.assign(updatedComment, attrs);
    return this.repo.save(updatedComment);
  }

  remove(comments: Partial<Comments>) {
    return this.repo.delete(comments.id);
  }
}
