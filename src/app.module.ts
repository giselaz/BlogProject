import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from './image/image.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image/image.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity';
import { RoleEntity } from './role/role.entity';
import { RoleModule } from './role/role.module';
import { CommentsModule } from './comments/comments.module';
// import RolesGuard from './role/roles.guard';
import { Comments } from './comments/comments.entity';
@Module({
  imports: [
    ImageModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Image, User, Category, Comments, RoleEntity],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    RoleModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
