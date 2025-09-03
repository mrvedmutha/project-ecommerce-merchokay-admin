// Payment Type Enums
export enum PaymentType {
  PREPAID = 'prepaid',
  COD = 'cod',
  PARTIAL_COD = 'partial_cod',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PARTIALLY_PAID = 'partially_paid',
  FULLY_PAID = 'fully_paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum PaymentGateway {
  RAZORPAY = 'razorpay',
  PAYPAL = 'paypal',
  COD = 'cod',
}

// For Partial COD: upfront payment uses Razorpay/PayPal, remaining balance uses COD
export enum PaymentMethod {
  ONLINE = 'online', // Razorpay or PayPal
  CASH_ON_DELIVERY = 'cash_on_delivery',
}
