import {
  Controller,
  Get,
    Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { GoogleOauthGuard } from './guard/google.guard';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('/google')
  @UseGuards(GoogleOauthGuard)
  async google() {}

  @Get('/google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleCallBack(@Req() req: Request) {
    return this.authService.getLoginMessage(req.sessionID);
  }
}
