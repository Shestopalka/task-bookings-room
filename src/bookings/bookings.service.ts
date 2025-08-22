import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createRoomDto } from './dto/createRoom.dto';
import { bookingsRoomDto } from './dto/bookingsRoom.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async createRoom(dto: createRoomDto) {
    return this.prisma.room.create({
      data: {
        name: dto.name,
        capacity: dto.capacity,
      },
    });
  }

  async bookingsRoom(dto: bookingsRoomDto) {
    const room = await this.prisma.room.findUnique({
      where: { id: dto.room_id },
    });
    if (!room) throw new NotFoundException('Room not found');

    const overlapping = await this.prisma.booking.findFirst({
      where: {
        roomId: dto.room_id,
        OR: [
          {
            startTime: { lt: dto.end_time },
            endTime: { gt: dto.start_time },
          },
        ],
      },
    });
    if (overlapping) {
      throw new ForbiddenException('Room already booked for this period');
    }

    return this.prisma.booking.create({
      data: {
        startTime: dto.start_time,
        endTime: dto.end_time,
        roomId: dto.room_id,
        userId: dto.user_id,
      },
    });
  }

  async getAvailable(params: { start: string; end: string }) {
    const start = new Date(params.start);
    const end = new Date(params.end);

    const bookedRooms = await this.prisma.booking.findMany({
      where: {
        OR: [
          {
            startTime: { lt: end },
            endTime: { gt: start },
          },
        ],
      },
      select: { roomId: true },
    });

    const bookedRoomIds = bookedRooms.map((b) => b.roomId);

    return this.prisma.room.findMany({
      where: {
        id: { notIn: bookedRoomIds },
      },
    });
  }

  async deleteBookings(bookingsId: number, userId: number, role: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingsId },
    });
    if (!booking) throw new NotFoundException('Booking not found');
    console.log(booking.userId);

    if (role === 'user') {
      if (booking.userId !== userId) {
        throw new ForbiddenException('You can delete only your own bookings');
      }
      if (booking.startTime <= new Date()) {
        throw new ForbiddenException('You can delete only future bookings');
      }
    }

    return this.prisma.booking.delete({
      where: { id: bookingsId },
    });
  }

  async getUserBookings(userId: number, reservationId: number, role: string) {
    const reservation = await this.prisma.booking.findUnique({
      where: { id: reservationId },
    });
    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    if (role === 'user' && reservation.userId !== userId) {
      throw new ForbiddenException(
        'You do not have access to this reservation',
      );
    }

    return reservation;
  }
  async getAllBookings() {
    return this.prisma.booking.findMany({
      include: { room: true, user: true },
    });
  }
}
