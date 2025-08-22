import { Module } from '@nestjs/common';
import { RegHandler } from './reg.handler';
import { UserModule } from 'src/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { GetJwtToken } from './getJwtToken.handler';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtConfigModule } from 'src/auth/jwt/jwt.config.module';
import { LoginHandler } from './login.handler';

@Module({
  imports: [UserModule, ConfigModule, PrismaModule, JwtConfigModule],
  providers: [RegHandler, GetJwtToken, LoginHandler],
  exports: [RegHandler, GetJwtToken, LoginHandler],
})
export class HandlerModule {}
