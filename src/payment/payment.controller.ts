import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payment.service';
import { CreatePaymentDTO } from './dto/createPayment.dto';
import { IPaymentStatus } from './entities/payment.interface';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('/webhook')
  async process(@Body() createPaymentDTO: CreatePaymentDTO) {
    const payment = await this.paymentsService.create(createPaymentDTO);

    if (payment.status === IPaymentStatus.SUCCESS) {
      // CREATE BOOKING
      console.log('NOW IS ABLE TO CREATE BOOKING');

      await this.paymentsService.save(payment);
    }

    return {
      status: 'OK',
      message: 'payment created with success',
    };
  }
}
