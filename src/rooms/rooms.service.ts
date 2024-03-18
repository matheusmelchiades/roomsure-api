import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { RoomsFiltersDTO } from './dto/rooms.filters';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  findAll(filters: Partial<RoomsFiltersDTO> = {}): Promise<Room[]> {
    const { q, guests, startDate, endDate } = filters;
    let { page = 1, limit = 5 } = filters;

    let query = this.roomRepository.createQueryBuilder('rooms');

    if (startDate && endDate) {
      // Add the condition to check if the booking dates do not overlap
      query = query.andWhere(
        'rooms.id NOT IN (SELECT room_id FROM bookings WHERE (start_date <= :startDate AND end_date >= :endDate))',
        {
          startDate,
          endDate,
        },
      );
    } else if (startDate) {
      query = query.andWhere(
        'rooms.id NOT IN (SELECT room_id FROM bookings WHERE (start_date <= :startDate))',
        {
          startDate,
          endDate,
        },
      );
    } else if (endDate) {
      query = query.andWhere(
        'rooms.id NOT IN (SELECT room_id FROM bookings WHERE (end_date >= :endDate))',
        {
          startDate,
          endDate,
        },
      );
    }

    if (guests) {
      query = query.andWhere('rooms.capacity = :guests', { guests });
    }

    if (q) {
      query = query.andWhere(
        'rooms.title ILIKE :q OR rooms.description ILIKE :q',
        {
          q: `%${q}%`,
        },
      );
    }

    if (page < 1) {
      page = 1;
    }

    if (limit < 0) {
      limit = 0;
    }

    query = query.skip((page - 1) * limit).take(limit);

    return query.getMany();
  }

  async findOne(id: string) {
    try {
      const res = this.roomRepository.findOne({
        where: { id },
      });

      return res || null;
    } catch (err) {
      return null;
    }
  }
}
