import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthSerializer } from './serialization.provider';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [
    PassportModule.registerAsync({
      useFactory: async () => ({
        session: true,
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, AuthSerializer],
  exports: [AuthService],
})
export class AuthModule {}
