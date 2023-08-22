import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class GoogleOauthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const activate = await super.canActivate(context);
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return !!activate;
  }
}
