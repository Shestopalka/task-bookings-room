import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class RegistrationDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MaxLength(15)
  @MinLength(4)
  password: string;

  @IsNotEmpty()
  username: string;
}
