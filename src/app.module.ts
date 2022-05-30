import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/posts/image/image.entity';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity';
import { RoleEntity } from './role/role.entity';
import { RoleModule } from './role/role.module';
import { Comments } from './posts/comments/comments.entity';
@Module({
  imports: [
    PostsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Image, User, Category, Comments, RoleEntity],
      synchronize: true,
    }),
    UserModule,
    CategoryModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
