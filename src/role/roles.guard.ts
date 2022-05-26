// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { RoleService } from './roles.service';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private roleService: RoleService) {}
//   readonly userRole = ['admin'];
//   canActivate(context: ExecutionContext): boolean {
//     const { user } = context.switchToHttp().getRequest();
//     return this.userRole.some((role) => {
//       console.log(role, user);
//       user.roles === role;
//     });
//   }
// }

import { Role } from './role.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
// import RequestWithUser from '../authentication/requestWithUser.interface';

const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      console.log(user, role);
      return user?.roles.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
