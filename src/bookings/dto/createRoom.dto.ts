import { IsNotEmpty } from 'class-validator';

export class createRoomDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  capacity: number;
}
