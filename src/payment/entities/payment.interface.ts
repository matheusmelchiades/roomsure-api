export enum IPaymentStatus {
  FAILED = 'FAILDED',
  SUCCESS = 'SUCCESS',
  PROCESSING = 'PROCESSING',
}

export interface IPayment {
  id: string;
  amount: number;
  item: any;
  customer: string;
  status: IPaymentStatus;
  message: string;
  externalId: string;
}
