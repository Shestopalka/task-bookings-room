import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtConfigModule } from 'src/auth/jwt/jwt.config.module';

@Module({
  imports: [PrismaModule, JwtConfigModule],
  providers: [BookingsService],
  controllers: [BookingsController],
})
export class BookingsModule {}
