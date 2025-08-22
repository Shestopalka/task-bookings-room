import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RegistrationDto } from './dto/registration.dto';
import { RegHandler } from 'src/handlers/reg.handler';
import { UsersService } from 'src/users/users.service';
import { GetJwtToken } from 'src/handlers/getJwtToken.handler';
import { LoginDto } from './dto/login.dto';
import { LoginHandler } from 'src/handlers/login.handler';
import { ConfigService } from '@nestjs/config';
import { AdminDto } from 'src/bookings/dto/addAdmin-role.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly regHandler: RegHandler,
    private readonly userService: UsersService,
    private readonly getJwtToken: GetJwtToken,
    private readonly loginHadnler: LoginHandler,
    private readonly config: ConfigService,
  ) {}

  async registartion(dto: RegistrationDto) {
    try {
      console.log('service lalalalal');
      await this.regHandler.handle(dto);

      const user = await this.userService.create(dto);
      const acces_token = await this.getJwtToken.handle({
        userId: user.id,
        email: user.email,
        role: user.role,
      });
      console.log('LALALALALA');

      return { acces_token };
    } catch (err) {
      throw err;
    }
  }
  async login(dto: LoginDto) {
    try {
      const userId = await this.loginHadnler.handle(dto);
      const user = await this.userService.findOne(userId);

      const access_token = await this.getJwtToken.handle({
        userId: userId,
        email: dto.email,
        role: user.role,
      });
      return { access_token };
    } catch (err) {
      throw err;
    }
  }
  async addAdminRole(dto: AdminDto) {
    try {
      if (dto.secret_key !== this.config.get<string>('SECRET_KEY'))
        throw new UnauthorizedException('You cannot do this.');
      const user = await this.userService.findOne(dto.userId);
      dto.userId = user.id;
      await this.userService.update(user.id, { role: 'admin' });
    } catch (err) {
      throw err;
    }
  }
}
