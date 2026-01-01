import { Controller, Get } from '@nestjs/common';
import { RBAC } from '../../../../libs/common/src/decorators/role.decorator';
import { Role } from '../../../../libs/common/src/enum/role.enum';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test-rbac')
  @RBAC(Role.ADMIN)
  async testRBAC() {
    return true;
  }
}
