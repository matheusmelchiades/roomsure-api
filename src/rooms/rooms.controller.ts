import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsFiltersDTO } from './dto/rooms.filters';
import { RoomsParamsDTO } from './dto/rooms.params';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  findAll(@Query() filters: RoomsFiltersDTO) {
    return this.roomsService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param() roomsParamsDTO: RoomsParamsDTO) {
    const record = await this.roomsService.findOne(roomsParamsDTO?.id);

    if (!record) throw new NotFoundException('Room not found');

    return record;
  }
}
