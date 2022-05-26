import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleEntity } from './role.entity';
import { RoleService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
