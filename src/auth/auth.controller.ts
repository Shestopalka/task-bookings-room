import { Body, Controller, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { AdminDto } from 'src/bookings/dto/addAdmin-role.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  async registration(@Body() dto: RegistrationDto) {
    return await this.authService.registartion(dto);
  }

  @Post('/login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }
  @Patch('/add-admin')
  async addAddminRole(@Body() dto: AdminDto) {
    return await this.authService.addAdminRole(dto);
  }
}
