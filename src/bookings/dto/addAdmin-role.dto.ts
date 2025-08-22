import { IsNotEmpty } from 'class-validator';

export class AdminDto {
  @IsNotEmpty()
  userId: number;
  secret_key: string;
}
