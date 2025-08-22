import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';

@Global() // робимо глобальним, щоб не імпортувати в кожному модулі
@Module({
  providers: [RedisService],
  exports: [RedisService], // експортуємо сервіс для інших модулів
})
export class RedisModule {}
