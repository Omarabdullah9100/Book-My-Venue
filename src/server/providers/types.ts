/**
 * Provider interfaces. Each external service sits behind one of these so dev uses a mock
 * and production swaps the implementation without touching business logic.
 * Implementations arrive with their milestones: sms (M1), storage (M3), payment (M5), email (M7).
 */
import type { Paise } from "@/lib/money"

export interface SmsProvider {
  sendOtp(phone: string, code: string): Promise<void>
}

export interface EmailProvider {
  send(message: { to: string; subject: string; html: string; text: string }): Promise<void>
}

export interface StorageProvider {
  put(key: string, body: Uint8Array, contentType: string): Promise<{ url: string }>
  delete(key: string): Promise<void>
}

export interface PaymentProvider {
  createOrder(input: { amount: Paise; receipt: string }): Promise<{ orderId: string }>
  /** Throws if the signature is invalid. Receives the raw, unparsed request body. */
  verifyWebhook(
    rawBody: string,
    signature: string,
  ): { eventId: string; type: string; payload: unknown }
  refund(input: { paymentId: string; amount: Paise }): Promise<{ refundId: string }>
}

/** Deferred: WhatsApp flows. Interface reserved so notification fan-out can add a channel later. */
export interface WhatsAppProvider {
  send(to: string, template: string, params: Record<string, string>): Promise<void>
}
