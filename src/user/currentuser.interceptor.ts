import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { UserService } from './user.service';
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UserService) {}
  async intercept(context: ExecutionContext, handeler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    //const { userId } = request.session || {};

    //     if (userId) {
    //       const user = await this.userService.findOne(userId);
    //       request.CurrentUser = user;
    //     }
    //   }
    return handeler.handle();
  }
}
