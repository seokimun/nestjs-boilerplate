import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/libs/decorators/user.decorator';
import { Public } from '../../../libs/decorators/public.decorator';
import { AuthService } from './auth.service';
import type { Payload } from './jwt/jwt.payload';

@Controller({ path: 'auth', version: '1' })
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
