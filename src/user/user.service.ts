import { BadRequestException, Injectable } from '@nestjs/common';
import { ValidateUserDto } from 'src/user/dto/validate-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async validateUser(info: ValidateUserDto): Promise<User> {
    let user = await this.prisma.user.findUnique({
      where: { email: info.email },
    });
    if (!user) user = await this.prisma.user.create({ data: info });
    return user;
  }

  async findById(id: number): Promise<User> {
    let user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new BadRequestException(`No user found with id ${id}`);
    }
    return user;
  }

  getPublicMessage(): string {
    return 'This message is public to all!';
  }

  getPrivateMessage(): string {
    return 'You can only see this if you are authenticated';
  }

  getAdminMessage(): string {
    return 'You can only see this if you are an admin';
  }

  getLogoutMessage(): string {
    return 'The session has ended';
  }
}
