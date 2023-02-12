import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class FindHabitsByDateBody {
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date: Date;
}
