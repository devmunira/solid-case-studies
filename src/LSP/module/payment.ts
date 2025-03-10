class PaymentProcess {
  private amount: number;
  constructor(amount: number) {
    this.amount = amount;
  }
}

class OnlinePayment extends PaymentProcess {
  onlinePay() {}
}

class ManualPayment extends PaymentProcess {
  manualPay() {}
}

new ManualPayment(100).manualPay();

new OnlinePayment(1000).onlinePay();
