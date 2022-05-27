import { Category } from 'src/category/category.entity';
import { Comments } from 'src/comments/comments.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.image)
  user: User;

  @ManyToMany(() => Category, { cascade: true })
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Comments, (comments) => comments.image)
  comments: Comments[];
}
