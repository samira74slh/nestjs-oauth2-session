import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class LoggedInGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    let request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}
