import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../../../libs/decorators/role.decorator';
import { Role } from '../../../../libs/enum/role.enum';
import ApiError from '../../../../libs/errors/api.error';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw ApiError.Unauthorized('로그인이 필요합니다', 'AUTH_REQUIRED');
    }

    if (!requiredRoles.includes(user.role)) {
      throw ApiError.Forbidden('접근 권한이 없습니다', 'ROLE_FORBIDDEN');
    }

    return true;
  }
}
