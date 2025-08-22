import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { IHandle } from 'src/interfaces/handler.interface';

@Injectable()
export class GetJwtToken implements IHandle<PayloadDto, string> {
  constructor(private readonly jwtService: JwtService) {}

  async handle(dto: PayloadDto): Promise<string> {
    const acces_token = await this.jwtService.sign(dto);
    return acces_token;
  }
}
