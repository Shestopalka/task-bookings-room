import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly redis: Redis;

  constructor() {
    // просте підключення при створенні сервісу
    this.redis = new Redis({
      host: 'localhost', // ім’я сервісу з docker-compose
      port: 6379,
    });

    this.redis.on('connect', () => console.log('✅ Connected to Redis'));
    this.redis.on('error', (err) => console.error('❌ Redis error:', err));
  }

  async setToken(userId: string, token: string, ttlSeconds: number) {
    await this.redis.set(`token:${userId}`, token, 'EX', ttlSeconds);
  }

  async getToken(userId: string) {
    return this.redis.get(`token:${userId}`);
  }

  async deleteToken(userId: string) {
    await this.redis.del(`token:${userId}`);
  }

  onModuleDestroy() {
    this.redis.quit();
  }
}
