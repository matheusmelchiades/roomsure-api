import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IPayment, IPaymentStatus } from './payment.interface';

@Entity('payments')
export class Payment implements IPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, default: 0 })
  amount: number;

  @Column()
  customer: string;

  @Column('json', {
    default: '{}',
  })
  item: any;

  @Column({ default: IPaymentStatus.PROCESSING })
  status: IPaymentStatus;

  @Column({ default: '' })
  message: string;

  @Column('uuid', {
    name: 'external_id',
  })
  externalId: string;
}
