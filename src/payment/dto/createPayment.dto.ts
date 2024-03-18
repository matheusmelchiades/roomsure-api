import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsObject,
  ValidateNested,
  IsUUID,
  IsEmail,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { GATEWAY_PAYMENT_STATUS } from '../entities/payment.status';

class CreatePaymentPurchaseItemDTO {
  @IsString()
  @IsUUID()
  roomId: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;
}

class CreatePaymentPuchaseDTO {
  @IsNumber()
  amount: number;

  @IsObject()
  @ValidateNested()
  item: CreatePaymentPurchaseItemDTO;
}

export class CreatePaymentDTO {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(GATEWAY_PAYMENT_STATUS)
  status: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  customer: string;

  @IsObject()
  @ValidateNested()
  purchase: CreatePaymentPuchaseDTO;
}
