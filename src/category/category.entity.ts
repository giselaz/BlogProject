import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Image } from 'src/image/image.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  description: string;
}
