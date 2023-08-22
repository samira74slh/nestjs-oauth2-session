import { Injectable } from '@nestjs/common';
import { PrismaServiceOptions } from 'nestjs-prisma';

@Injectable()
export class PrismaConfigService implements PrismaConfigService {
  constructor() {}
  async createPrismaOptions(): Promise<PrismaServiceOptions> {
    return {
      prismaOptions: {
        log: ['info', 'query'],
      },
      explicitConnect: true,
    };
  }
}
