import { IsNotEmpty } from 'class-validator';

export class bookingsRoomDto {
  @IsNotEmpty()
  room_id: number;

  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  start_time: Date;

  @IsNotEmpty()
  end_time: Date;
}
