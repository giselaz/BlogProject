import {
  Controller,
  Post,
  Body,
  Injectable,
  UseGuards,
  Get,
  Param,
  NotFoundException,
  Patch,
  Delete,
  Req,
} from '@nestjs/common';
import { ImageDto } from './dto/image.dto';
import { ImageService } from './image.service';
import { JwtAuthGuards } from 'src/auth/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { Image } from './image.entity';
// import { Roles } from 'src/role/role.decorator';
import RolesGuard from 'src/role/roles.guard';
import { Role } from 'src/role/role.enum';

@Controller('image')
@Injectable()
export class ImageController {
  constructor(
    private imageService: ImageService,
    private userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuards, RolesGuard(Role.Admin))
  @Post('/newImage')
  async createImage(@Body() body: Image, @Req() request) {
    const user = request.user;
    const image = await this.imageService.create(
      body.name,
      user,
      null,
      // body.categories,
    );
    return image;
  }

  @UseGuards(JwtAuthGuards)
  @Get('/:id')
  async getImage(@Param('id') id: string) {
    const image = await this.imageService.findOne(parseInt(id));
    if (!image) {
      throw new NotFoundException('image not found');
    }
    return image;
  }
  @UseGuards(JwtAuthGuards)
  @Patch('/:id')
  async updateImage(@Param('id') id: string, @Body() body: ImageDto) {
    return await this.imageService.Update(parseInt(id), body);
  }
  @Delete('/:id')
  async deleteImage(@Param('id') id: string) {
    return await this.imageService.delete(parseInt(id));
  }
}
