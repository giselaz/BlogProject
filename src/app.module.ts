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
import { APP_GUARD } from '@nestjs/core';
import RolesGuard from './role/roles.guard';
@Module({
  imports: [
    ImageModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Image, User, Category, RoleEntity],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
