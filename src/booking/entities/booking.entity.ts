import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IBooking } from './booking.interface';
import { Payment } from 'src/payment/entities/payment.entity';
import { Room } from 'src/rooms/entities/room.entity';

@Entity('bookings')
export class Booking implements IBooking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'start_date',
  })
  startDate: string;

  @Column({
    name: 'end_date',
  })
  endDate: string;

  @OneToOne(() => Room)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @OneToOne(() => Payment)
  @JoinColumn({ name: 'payment_id' })
  payment: Payment;
}
