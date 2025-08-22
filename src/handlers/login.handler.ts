import { BadRequestException, Injectable } from '@nestjs/common';
import { IHandle } from 'src/interfaces/handler.interface';

import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class LoginHandler implements IHandle<LoginDto, number> {
  constructor(private readonly userService: UsersService) {}

  async handle(dto: LoginDto): Promise<number> {
    try {
      const user = await this.userService.findOneByEmail(dto.email);
      const isValidPass = await bcrypt.compare(dto.password, user.password);
      if (!isValidPass)
        throw new BadRequestException('This password not valid!');

      return user.id;
    } catch (err) {
      throw err;
    }
  }
}
