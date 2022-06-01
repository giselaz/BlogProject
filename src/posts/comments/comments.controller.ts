import {
  Body,
  Controller,
  Injectable,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comments } from './comments.entity';
import { JwtAuthGuards } from 'src/user/auth/jwt-auth.guard';
import RoleGuard from 'src/role/roles.guard';
import { Role } from 'src/role/role.enum';
@Controller('comments')
@Injectable()
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuards, RoleGuard(Role.subscriber))
  @Post('')
  createComment(@Body() body: Comments, @Req() request) {
    const user = request.user;
    const comment = this.commentsService.create(
      body.description,
      user,
      body.image,
    );
    return comment;
  }
  @UseGuards(JwtAuthGuards, RoleGuard(Role.subscriber))
  @Patch('/:id')
  updateComment(@Param('id') id: string, @Body() body: Comments) {
    return this.commentsService.update(parseInt(id), body);
  }
}
