import { Controller, Get } from '@nestjs/common';
import { RBAC } from '../../../libs/decorators/role.decorator';
import { Role } from '../../../libs/enum/role.enum';
import { UserService } from './user.service';

@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test-rbac')
  @RBAC(Role.ADMIN)
  async testRBAC() {
    return true;
  }
}
