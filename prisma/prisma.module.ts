// prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // робимо глобальним, щоб не імпортувати у всі модулі
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
