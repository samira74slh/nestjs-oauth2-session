import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { PayloadDto } from './dto/payload.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  async serializeUser(user: User, done: Function): Promise<any> {
    done(null, user);
  }

  async deserializeUser(payload: PayloadDto, done: Function): Promise<any> {
    const user = await this.userService.findById(payload.id);
    return user ? done(null, user) : done(null, null);
  }
}
