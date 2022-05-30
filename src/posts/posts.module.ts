import { Module } from '@nestjs/common';
import { ImageService } from './image/image.service';
import { ImageController } from './image/image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image/image.entity';
import { UserModule } from 'src/user/user.module';
import { RoleModule } from 'src/role/role.module';
import { Comments } from './comments/comments.entity';
import { CommentsService } from './comments/comments.service';
import { CommentsController } from './comments/comments.controller';
import { CategoryModule } from 'src/category/category.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Image, Comments]),
    UserModule,
    RoleModule,
    CategoryModule,
  ],
  providers: [ImageService, CommentsService],
  controllers: [ImageController, CommentsController],
})
export class PostsModule {}
