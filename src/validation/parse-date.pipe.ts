import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      value.start_time = new Date(value.start_time);
      value.end_time = new Date(value.end_time);
      console.log(value.end_time, value.start_time);

      if (
        isNaN(value.start_time.getTime()) ||
        isNaN(value.end_time.getTime())
      ) {
        throw new BadRequestException('Invalid date format');
      }

      return value;
    } catch {
      throw new BadRequestException('Invalid date format');
    }
  }
}
