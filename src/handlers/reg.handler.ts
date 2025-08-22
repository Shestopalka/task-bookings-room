import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RegistrationDto } from 'src/auth/dto/registration.dto';
import { IHandle } from 'src/interfaces/handler.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RegHandler implements IHandle<RegistrationDto, void> {
  constructor(
    private readonly userService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  async handle(dto: RegistrationDto): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (user) throw new BadRequestException('This email already exists');
  }
}
