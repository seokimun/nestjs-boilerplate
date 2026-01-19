import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Payload } from './jwt/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly env: ConfigService,
    private readonly userService: UserService,
  ) {}

  signAccessToken(payload: Payload): string {
    return this.jwt.sign(payload, {
      secret: this.env.getOrThrow<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.env.getOrThrow<number>('JWT_ACCESS_EXPIRES_IN'),
    });
  }

  signRefreshToken(payload: Pick<Payload, 'id'>): string {
    return this.jwt.sign(payload, {
      secret: this.env.getOrThrow<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.env.getOrThrow<number>('JWT_REFRESH_EXPIRES_IN'),
    });
  }

  issueTokens(payload: Payload) {
    const accessToken = this.signAccessToken(payload);
    const refreshToken = this.signRefreshToken({ id: payload.id });

    return { accessToken, refreshToken };
  }

  async issueAccessToken(userId: string) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const payload: Payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.signAccessToken(payload);

    return { accessToken };
  }
}
