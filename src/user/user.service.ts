import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { RoleService } from 'src/role/roles.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private roleService: RoleService,
  ) {}
  async create(user: Partial<CreateUserDto>) {
    const role = await this.roleService.findOne({
      name: user.roles,
    });
    if (!role) {
      throw new NotFoundException('Role does not exist');
    }
    const newUser = this.repo.create({
      email: user.email,
      password: user.password,
      roles: role,
    });
    return this.repo.save(newUser);
  }

  async findOne(options: Partial<UserDto>) {
    const user = await this.repo.findOne(options, {
      relations: ['roles'],
    });
    return user;
  }

  find(email: string) {
    return this.repo.find({ email });
  }

  async update(id, attrs: Partial<UserDto>) {
    const updatedUser = await this.findOne(id);
    if (!updatedUser) {
      throw new NotFoundException('user not found');
    }
    Object.assign(updatedUser, attrs);
    return this.repo.save(updatedUser);
  }

  async remove(id: Partial<UserDto>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(user);
  }
}
