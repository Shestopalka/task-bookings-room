import { IsNotEmpty } from 'class-validator';

export class PayloadDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  role: string;
}
