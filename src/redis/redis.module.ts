import { Module } from '@nestjs/common';
import { REDIS } from './constants/redis.constants';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    {
      inject: [ConfigService],
      provide: REDIS,
      useFactory: async (configService: ConfigService) => {
        const client = createClient({
          url: configService.get('local.redis.redisUrl'),
        });
        await client.connect();
        return client;
      },
    },
  ],
  exports: [REDIS],
})
export class RedisModule {}
