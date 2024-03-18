import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payment.service';
import { CreatePaymentDTO } from './dto/createPayment.dto';
import { IPaymentStatus } from './entities/payment.interface';
import { BookingsService } from 'src/booking/booking.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly bookingsService: BookingsService,
  ) {}

  @Post('/webhook')
  async process(@Body() createPaymentDTO: CreatePaymentDTO) {
    const payment = await this.paymentsService.create(createPaymentDTO);

    if (payment.status === IPaymentStatus.SUCCESS) {
      await this.bookingsService.save({
        startDate: createPaymentDTO.purchase.item.startDate,
        endDate: createPaymentDTO.purchase.item.endDate,
        roomId: createPaymentDTO.purchase.item.roomId,
        paymentId: payment.id,
      });
    }

    await this.paymentsService.save(payment);

    return {
      status: 'OK',
      message: 'payment registred with success',
    };
  }
}
