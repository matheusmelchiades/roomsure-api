import { Injectable } from '@nestjs/common';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDTO } from './dto/createPayment.dto';
import { IPayment, IPaymentStatus } from './entities/payment.interface';
import { GATEWAY_PAYMENT_STATUS } from './entities/payment.status';
import { randomUUID } from 'crypto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  create(createPaymentDTO: CreatePaymentDTO) {
    let status = IPaymentStatus.PROCESSING;

    if (
      [
        GATEWAY_PAYMENT_STATUS.APPROVED,
        GATEWAY_PAYMENT_STATUS.PENDING,
      ].includes(createPaymentDTO.status as GATEWAY_PAYMENT_STATUS)
    ) {
      status = IPaymentStatus.SUCCESS;
    } else {
      status = IPaymentStatus.FAILED;
    }

    return this.paymentRepository.create({
      id: randomUUID(),
      amount: Number(createPaymentDTO.purchase.amount),
      item: createPaymentDTO?.purchase?.item || {},
      customer: createPaymentDTO.customer,
      status,
      message: createPaymentDTO.message,
      externalId: createPaymentDTO.id,
    });
  }

  save(payment: IPayment) {
    return this.paymentRepository.save(payment);
  }
}
