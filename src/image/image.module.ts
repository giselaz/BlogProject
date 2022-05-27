import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { UserModule } from 'src/user/user.module';
import { RoleModule } from 'src/role/role.module';
import { CommentsModule } from 'src/comments/comments.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Image]),
    UserModule,
    RoleModule,
    CommentsModule,
  ],
  providers: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
