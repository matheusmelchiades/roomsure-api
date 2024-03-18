import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentsController } from './payment.controller';
import { PaymentsService } from './payment.service';
import { BookingModule } from 'src/booking/booking.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), BookingModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentModule {}
