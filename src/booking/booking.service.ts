import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDTO } from './dto/createBooking.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  findAll() {
    return this.bookingRepository.find({
      relations: ['room'],
    });
  }

  save(createBookingDTO: CreateBookingDTO) {
    return this.bookingRepository.save({
      id: randomUUID(),
      startDate: createBookingDTO.startDate,
      endDate: createBookingDTO.endDate,
      room: {
        id: createBookingDTO.roomId,
      },
      payment: {
        id: createBookingDTO.paymentId,
      },
    });
  }
}
