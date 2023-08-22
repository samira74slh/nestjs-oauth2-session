import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { createHmac } from 'crypto';
import localConfig from 'src/config/local-config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @Inject(localConfig.KEY)
    private readonly configService: ConfigType<typeof localConfig>,
  ) {}
  getLoginMessage(sessionID: string): string {
    const getConnectSid =
      'connect.sid=s%3A' +
      sessionID +
      '.' +
      createHmac('sha256', this.configService.session.secret)
        .update(sessionID)
        .digest('base64')
        .replace(/\=+$/, '');
    this.logger.verbose(getConnectSid);
    return 'You can only see this if you are logged in';
  }
}
