import { Category } from 'src/category/category.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.image, {
    cascade: true,
  })
  user: User;

  // @ManyToMany(() => Category, { cascade: true })
  // @JoinTable()
  // categories: Category[];
}
