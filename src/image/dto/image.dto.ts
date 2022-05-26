import { Image } from '../image.entity';
import { IsString } from 'class-validator';

export class ImageDto {
  @IsString()
  name: string;
}
