import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { createRoomDto } from './dto/createRoom.dto';
import { bookingsRoomDto } from './dto/bookingsRoom.dto';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { ParseDatePipe } from 'src/validation/parse-date.pipe';
import { RoleGuard } from 'src/auth/guard/role.guard';

@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Post('/rooms')
  async createRoom(@GetUser() user: PayloadDto, @Body() dto: createRoomDto) {
    console.log(user);

    return await this.bookingsService.createRoom(dto);
  }

  @Post('/bookings')
  async bookingsRoom(@Body(ParseDatePipe) dto: bookingsRoomDto) {
    return await this.bookingsService.bookingsRoom(dto);
  }

  @Get('/rooms/available/:start/:end')
  async getAvailable(@Param() params: { start: string; end: string }) {
    return await this.bookingsService.getAvailable(params);
  }

  //джпт для цього ендпоінта хоче айдішник і роль, достанеш собі і передаш
  @Delete('/bookings/:id')
  async deleteBookings(
    @GetUser() user: PayloadDto,
    @Param('id', ParseIntPipe) bookingsId: number,
  ) {
    return await this.bookingsService.deleteBookings(
      bookingsId,
      user.userId,
      user.role,
    );
  }
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get('/users/:id/bookings')
  async getUserBookings(
    @GetUser() user: PayloadDto,
    @Param('id', ParseIntPipe) reservationId: number,
  ) {
    return await this.bookingsService.getUserBookings(
      user.userId,
      reservationId,
      user.role,
    );
  }

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get('/bookings')
  async getAllBookings() {
    return await this.bookingsService.getAllBookings();
  }
}
