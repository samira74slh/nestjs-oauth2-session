import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/auth/guard/logged-in-guard';
import { AdminGuard } from 'src/auth/guard/admin.guard';
import { Request, Response } from 'express';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  publicRoute() {
    return this.userService.getPublicMessage();
  }

  @UseGuards(LoggedInGuard)
  @ApiSecurity('cookie')
  @Get('private')
  guardedRoute() {
    return this.userService.getPrivateMessage();
  }

  @UseGuards(AdminGuard)
  @ApiSecurity('cookie')
  @Get('admin')
  getAdminMessage() {
    return this.userService.getAdminMessage();
  }

  @ApiSecurity('cookie')
  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy((err) => {
      res.redirect('/api/auth/google');
    });
    return this.userService.getLogoutMessage();
  }
}
