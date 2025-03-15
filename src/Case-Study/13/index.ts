// Background: An online store processes payments using a specific payment gateway (e.g., PayPal).
// The store might later integrate additional payment providers or switch to another gateway
// entirely. The payment processing logic should not rely directly on any specific payment
// provider.

// Question: How would you design the payment processing module so that it can handle different
// payment gateways without altering the main payment logic?

interface IPaymentProcess {
  getConfig(): void;
  payment(): void;
}

interface IPaymentFactory {
  getService(type: PaymentType): IPaymentProcess;
}

enum PaymentType {
  PAYPAL,
  STRIPE,
}

class PayPalPaymentProcessor implements IPaymentProcess {
  constructor() {}
  getConfig(): void {}
  payment(): void {}
}

class StripePaymentProcessor implements IPaymentProcess {
  constructor() {}
  getConfig(): void {}
  payment(): void {}
}

class PaymentFactory implements IPaymentFactory {
  private paymentGateways: Map<PaymentType, IPaymentProcess>;

  constructor() {
    this.paymentGateways = new Map();
    this.paymentGateways.set(PaymentType.PAYPAL, new PayPalPaymentProcessor());
    this.paymentGateways.set(PaymentType.STRIPE, new StripePaymentProcessor());
  }

  getService(type: PaymentType): IPaymentProcess {
    const gateway = this.paymentGateways.get(type);
    if (!gateway) throw new Error("Invaild Gateway Request");
    return gateway;
  }
}

// Client Code
const paymentProcessor = new PaymentFactory().getService(PaymentType.PAYPAL);
const payments = paymentProcessor.payment();
