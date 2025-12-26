import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './jwt/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly env: ConfigService,
  ) {}

  signToken(payload: Payload): string {
    return this.jwtService.sign(payload, {
      expiresIn: this.env.getOrThrow<number>('JWT_EXPIRES_IN'),
    });
  }
}
