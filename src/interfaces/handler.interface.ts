import { TDto } from 'src/types/tDto.type';

export interface IHandle<T extends TDto, R = void> {
  handle(dto: T): Promise<R>;
}
