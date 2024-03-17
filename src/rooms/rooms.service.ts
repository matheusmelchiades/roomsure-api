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
    const { q, guests } = filters;
    let { page = 1, limit = 5 } = filters;

    let query = this.roomRepository.createQueryBuilder('r');

    if (q) {
      query = query.andWhere('r.title ILIKE :q OR r.description ILIKE :q', {
        q: `%${q}%`,
      });
    }

    if (guests) {
      query = query.andWhere('r.capacity = :guests', { guests });
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
