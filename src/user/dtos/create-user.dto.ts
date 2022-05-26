import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { RoleEntity } from 'src/role/role.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNotEmpty()
  roles: string;
}
