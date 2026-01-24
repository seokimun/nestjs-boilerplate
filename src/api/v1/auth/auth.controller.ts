import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';
import { User } from 'src/libs/decorators/user.decorator';
import { Public } from '../../../libs/decorators/public.decorator';
import { AuthService } from './auth.service';
import type { Payload } from './jwt/jwt.payload';
import { RefreshGuard } from './jwt/refresh.guard';

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
  googleLoginCallback(
    @User() user: Payload,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = this.authService.issueTokens(user);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true, // XSS 공격으로부터 탈취위험 방지
      secure: false, // HTTPS 사용 시 true로 설정
      sameSite: 'lax', // CSRF 공격 방지 / 프론트 도메인이 다른 경우 'none'으로 설정
      path: '/v1/auth/refresh-token', // 이 쿠키는 해당 경로로 요청할 때만 브라우저가 붙여 보냄
      maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
    });

    return { accessToken };
  }

  @Post('refresh-token')
  @Public()
  @UseGuards(RefreshGuard)
  async refreshToken(@User() user: { id: string }) {
    return await this.authService.issueAccessToken(user.id);
  }
}
