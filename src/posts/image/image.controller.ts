import {
  Controller,
  Post,
  Body,
  Injectable,
  UseGuards,
  Param,
  Patch,
  Delete,
  Req,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { JwtAuthGuards } from 'src/user/auth/jwt-auth.guard';
import { Image } from '../image/image.entity';
import { ImageDto } from './dto/image.dto';
import RoleGuard from 'src/role/roles.guard';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/role/role.decorator';
@Controller('image')
@Injectable()
export class ImageController {
  constructor(private imageService: ImageService) {}

  @UseGuards(JwtAuthGuards, RoleGuard(Role.editor))
  @Post('')
  async createImage(@Body() body: ImageDto, @Req() request) {
    const user = request.user;
    const image = await this.imageService.create(body, user);
    return image;
  }

  @UseGuards(JwtAuthGuards)
  @Patch('/:id')
  async updateImage(@Param('id') id: string, @Body() body: Image) {
    return await this.imageService.update(parseInt(id), body);
  }
  @Delete('/:id')
  async deleteImage(@Param('id') id: string) {
    return await this.imageService.delete(parseInt(id));
  }
}
