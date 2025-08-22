import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HandlerModule } from 'src/handlers/handler.module';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [HandlerModule, UserModule], // <-- модуль імпортуємо сюди
  controllers: [AuthController], // <-- тільки контролери
  providers: [AuthService],
})
export class AuthModule {}
