import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './role.entity';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity) private repo: Repository<RoleEntity>,
  ) {}

  async findOne(options: Partial<RoleEntity>) {
    return await this.repo.findOne(options);
  }
  async create(name: string) {
    if (!(await this.repo.findOne({ name }))) {
      const role = this.repo.create({ name });
      return this.repo.save(role);
    }
    throw new BadRequestException('role already exists');
  }

  async delete(id: number) {
    const role = await this.repo.findOne(id);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return this.repo.remove(role);
  }

  async find(options: Partial<RoleEntity>) {
    return await this.repo.find(options);
  }
}
