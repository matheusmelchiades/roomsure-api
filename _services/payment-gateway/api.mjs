import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import { randomUUID } from 'crypto';
import cors from 'cors';

const PORT = process.env.PORT || 3001;
const WEBHOOK_URL = process.env.WEBHOOK_URL || 'http://localhost:3000';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const STATUS = {
  APPROVED: 'APPROVED',
  PENDING: 'PENDING',
  INSUFFICIENT_FUNDS: 'INSUFFICIENT_FUNDS',
  INVALID_CARD: 'INVALID_CARD',
  EXPIRED_CARD: 'EXPIRED_CARD',
  CARD_NOT_ACTIVATED: 'CARD_NOT_ACTIVATED',
  FRAUD_SUSPECTED: 'FRAUD_SUSPECTED',
  DECLINED: 'DECLINED',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};

const CARDS_VALIDATION_MESSAGE_ERROR = {
  //SUCCESS
  1111222233334444: {
    status: STATUS.APPROVED,
    message: 'Transaction approved. Thank you for your purchase.',
  },
  4485234567890123: {
    status: STATUS.PENDING,
    message: 'Transaction pending. Please wait for bank confirmation.',
  },

  // ERROR
  5425233430109900: {
    status: STATUS.DECLINED,
    message: 'Transaction declined. Please check the card details.',
  },
  4716379012453981: {
    status: STATUS.INVALID_CARD,
    message: 'Invalid card. Please double-check the card number.',
  },
  4532897654321001: {
    status: STATUS.EXPIRED_CARD,
    message: 'Card expired. Please use a valid card.',
  },
  4916539108733422: {
    status: STATUS.INSUFFICIENT_FUNDS,
    message: 'Insufficient funds. Please add more funds to your card.',
  },
  4556012345678905: {
    status: STATUS.FRAUD_SUSPECTED,
    message: 'Fraud suspected. Please contact your bank.',
  },
  default: {
    status: STATUS.UNKNOWN_ERROR,
    message: 'An unknown error occurred while processing your transaction.',
  },
};

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/payment/process', async (req, res) => {
  try {
    console.log('Received payment request:', req.body);

    const { cardDetails, purchase, customer } = req.body || {};
    const { amount, item } = purchase || {};
    const { number, expireDate, cvv } = cardDetails || {};
    const paymentId = randomUUID();

    if (!number || !expireDate || !cvv) {
      return res
        .status(400)
        .json({ statusCode: 400, message: 'Invalid card details' });
    }

    if (!amount || !item) {
      return res
        .status(400)
        .json({ statusCode: 400, message: 'Invalid purchase details' });
    }

    if (!customer) {
      return res
        .status(400)
        .json({ statusCode: 400, message: 'Invalid customer details' });
    }

    const response = {
      id: paymentId,
      ...CARDS_VALIDATION_MESSAGE_ERROR[number || 'default'],
    };

    console.log('Response:', response);

    const data = {
      id: response.id,
      status: response.status,
      message: response.message,
      customer: customer.toString().toLowerCase() || '',
      purchase: purchase || {},
    };

    console.log('Sending webhook to API server');
    console.log('Webhook payload: ', data);

    const webHook = await axios({
      url: `${WEBHOOK_URL}/payments/webhook`,
      method: 'POST',
      data,
    });

    console.log('Webhook sent successfully');
    console.log('Webhook response: ', webHook.data);

    await delay(3500);

    console.log('Sending response');

    return res
      .status(
        [STATUS.APPROVED, STATUS.PENDING].includes(response.status) ? 200 : 400,
      )
      .json(response);
  } catch (error) {
    console.log(error.message);
    if (error.isAxiosError) {
      console.log(error.response.data);
    }

    return res
      .status(500)
      .json({ statusCode: 500, message: 'Internal server error' });
  }
});

app.listen(PORT, () => console.log(`Payment gateway running in ${PORT}`));
