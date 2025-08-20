import { Payment, MercadoPagoConfig } from "mercadopago";
import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

interface CardProcessI {
  number: string;
  name: string;
  cvv: string;
  exp: string;
  email: string;
  amount: number;
  installments: number;
  document: string;
}
@Injectable()
export class MercadoPago {
  private accessToken: string;
  constructor() {
    this.accessToken = process.env.VITE_MERCADOPAGO_ACCESS_TOKEN as string;
  }

  // async generatePix(transaction: Partial<Transaction.Create>, user: { email: string; fullname: string }): Promise<{ pix?: string; exp?: Date; transfer_id?: number; status?: number; error?: string }> {
  //   try {
  //     const { data } = await axios.post(
  //       "https://api.mercadopago.com/v1/payments",
  //       {
  //         transaction_amount: transaction.amount,
  //         token: this.accessToken,
  //         payment_method_id: "pix",
  //         payer: { email: user.email, first_name: user.fullname.split(" ")[0], last_name: user.fullname.split(" ")[-1], identification: { type: "CPF", number: transaction.payment_method.document } },
  //         notification_url: "https://0eff-168-196-138-69.ngrok-free.app/webhook/payment",
  //         date_of_expiration: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
  //       },
  //       { headers: { Authorization: `Bearer ${this.accessToken}`, "X-Idempotency-Key": uuidv4() } },
  //     );
  //     return { pix: data.point_of_interaction.transaction_data.qr_code, exp: data.date_of_expiration, transfer_id: data.id };
  //   } catch (error) {
  //     return { error: error.response.data.message || "Internal Error", status: error.response.data.status || 500 };
  //   }
  // }
  private async generateTokenCard(data: CardProcessI) {
    const response = await axios.post(
      "https://api.mercadopago.com/v1/card_tokens",
      {
        card_number: data.number,
        cardholder: { name: data.name, identification: { type: "CPF", number: data.document } },
        expiration_month: data.exp.split("/")[0],
        expiration_year: data.exp.split("/")[1],
        security_code: data.cvv,
        transaction_amount: data.amount,
        installments: data.installments,
      },
      { headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.accessToken}` } },
    );

    return response.data;
  }

  async processCardPayment(data: CardProcessI) {
    const token = await this.generateTokenCard(data);
    const client = new MercadoPagoConfig({ accessToken: this.accessToken });
    const pay = new Payment(client);
    const response = await pay.create({
      body: {
        transaction_amount: data.amount,
        token: token.id,
        description: "Buy Access in Aegis Capital",
        installments: Number(data.installments) || 1,
        payer: { email: data.email, identification: { type: "CPF", number: data.document } },
      },
      requestOptions: { idempotencyKey: uuidv4() },
    });

    return response;
  }
}
