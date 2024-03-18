import { IPayment } from 'src/payment/entities/payment.interface';
import { IRoom } from 'src/rooms/entities/room.interface';

export interface IBooking {
  id: string;
  startDate: string;
  endDate: string;
  room: IRoom;
  payment: IPayment;
}
