import { IsOptional, IsString } from 'class-validator';
import { Comments } from 'src/comments/comments.entity';
import { User } from 'src/user/user.entity';

export class ImageDto {
  @IsString()
  name: string;
  @IsString()
  user: User;
}
