import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google/google.strategy';
import { AccessStrategy } from './jwt/access.strategy';
import { RefreshStrategy } from './jwt/refresh.strategy';

@Module({
  imports: [
    PassportModule.register({ session: false }),
    JwtModule.register({}),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, AccessStrategy, RefreshStrategy],
})
export class AuthModule {}
