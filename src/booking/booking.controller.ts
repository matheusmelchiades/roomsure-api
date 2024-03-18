import { Controller, Get } from '@nestjs/common';
import { BookingsService } from 'src/booking/booking.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  find() {
    return this.bookingsService.findAll();
  }
}
