import { Exclude, Expose } from 'class-transformer';
import { RoleEntity } from 'src/role/role.entity';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Expose()
  roles: RoleEntity;
}
