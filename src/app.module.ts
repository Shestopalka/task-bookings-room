import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BookingsModule } from './bookings/bookings.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module'; // правильніше імпортувати модуль, а не сервіс
import { PrismaModule } from 'prisma/prisma.module';
import { JwtConfigModule } from './auth/jwt/jwt.config.module';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RedisModule,
    BookingsModule,
    AuthModule,
    UserModule,
    PrismaModule,
    JwtConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
