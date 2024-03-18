import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateBookingDTO {
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  roomId: string;

  @IsString()
  @IsNotEmpty()
  paymentId: string;
}
