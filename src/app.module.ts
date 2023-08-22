import {
  Inject,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import RedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { REDIS } from './redis/constants/redis.constants';
import { RedisClientType } from 'redis';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { PrismaConfigService } from './config/prisma-config';
import { PrismaModule } from 'nestjs-prisma';
import localConfig from './config/local-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [localConfig],
    }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useClass: PrismaConfigService,
    }),
    AuthModule,
    RedisModule,
    UserModule,
    PrismaModule,
  ],
  providers: [AppService, Logger],
  controllers: [AppController],
  exports: [AppService],
})
export class AppModule implements NestModule {
  constructor(
    @Inject(REDIS) private readonly redis: RedisClientType,
    @Inject(localConfig.KEY)
    private readonly configService: ConfigType<typeof localConfig>,
  ) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new RedisStore({ client: this.redis }),
          saveUninitialized: false,
          secret: this.configService.session.secret,
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 60000,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
