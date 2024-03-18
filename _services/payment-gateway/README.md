# Payment Gateway Script

## Description

This JavaScript script simulates a payment gateway service. It receives payment requests, validates card details, processes transactions, and sends webhooks to notify the API server about transaction status. The script is designed to be used as a standalone gateway for testing and demonstration purposes.

## Execution

To start the payment gateway script, run the following command:

```bash
> npm start
```

## Environment Variables

Before running the script, you need to configure the following environment variables:

| Variável       | Descrição                                     |
| -------------- | --------------------------------------------- |
| PORT           | Porta na qual o gateway de pagamento irá ouvir.  |
| WEBHOOK_URL    | URL para o endpoint de webhook do servidor da API. |

Make sure to configure these environment variables correctly before starting the payment gateway script.

## Example Request

You can use the following `curl` command to simulate a payment request:

```bash
    curl --location 'http://your-payment-gateway-server/payment/process' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "cardDetails": {
                "number": "1111222233334444",
                "expireDate": "2025-03-01",
                "cvv": "009"
            },
            "customer": "test@test.com",
            "purchase": {
                "amount": 190,
                "item": {
                    "roomId": "62ab4502-07c1-4ef7-aef2-d2f83685ff86",
                    "startDate": "2024-03-11T00:00:00.000Z",
                    "endDate": "2024-03-13T15:09:36.148Z"
                }
            }
        }'
```

Replace http://your-payment-gateway-server/payment/process with the actual URL of your payment gateway server.

This command sends a POST request to the payment gateway server with JSON data containing card details, purchase information, and customer details.

## Test Payment Cards

Use the following card numbers to test different payment scenarios:


| Card Number         | Status                 | Description                                                   |
| ------------------- | ---------------------- | ------------------------------------------------------------- |
| 1111 2222 3333 4444 | APPROVED               | Transaction approved. Thank you for your purchase!            |
| 4485 2345 6789 0123 | PENDING                | Transaction pending. Please wait for bank confirmation.        |
| 5425 2334 3010 9900 | DECLINED               | Transaction declined. Please check the card details.          |
| 4716 3790 1245 3981 | INVALID_CARD           | Invalid card. Please double-check the card number.            |
| 4532 8976 5432 1001 | EXPIRED_CARD           | Card expired. Please use a valid card.                        |
| 4916 5391 0873 3422 | INSUFFICIENT_FUNDS     | Insufficient funds. Please add more funds to your card.        |
| 4556 0123 4567 8905 | FRAUD_SUSPECTED        | Fraud suspected. Please contact your bank.                    |
| ...                 | UNKNOWN_ERROR          | An unknown error occurred while processing your transaction.  |

Please note that these cards are for testing purposes only and will not perform real transactions. Make sure to use these cards only in test environments.
