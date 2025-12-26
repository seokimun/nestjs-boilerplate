import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '../../../../libs/common/src/decorators/public.decorator';
import { User } from '../../../../libs/common/src/decorators/user.decorator';
import { AuthService } from './auth.service';
import type { Payload } from './jwt/jwt.payload';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @Public()
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/callback')
  @Public()
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@User() user: Payload) {
    return this.authService.signToken(user);
  }
}
