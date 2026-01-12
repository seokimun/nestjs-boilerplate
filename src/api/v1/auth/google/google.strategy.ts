import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { UserService } from '../../user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly env: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: env.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      clientSecret: env.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: env.getOrThrow<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    const email = profile.emails[0].value;
    const name = profile.displayName;

    const user = await this.userService.findOrCreate({ email, name });

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return done(null, payload);
  }
}
