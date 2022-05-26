import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Image } from 'src/image/image.entity';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { RoleEntity } from 'src/role/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Image, (image) => image.user)
  image: Image[];

  @ManyToOne(() => RoleEntity, (roles) => roles.user, {
    cascade: true,
  })
  roles: RoleEntity;
  // @Column()
  // roles: Role[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
