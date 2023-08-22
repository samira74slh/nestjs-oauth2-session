import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth2';
import { Profile } from 'passport-google-oauth20';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import localConfig from 'src/config/local-config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(localConfig.KEY)
    private configService: ConfigType<typeof localConfig>,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.google.clientID,
      clientSecret: configService.google.clientSecret,
      callbackURL: configService.google.callbackURL,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile
  ): Promise<User> {
    const { emails, displayName } = profile;
    return await this.userService.validateUser({
      name: displayName,
      email: emails[0].value,
    });
  }
}
