interface IPaymentProcess {
  payment(): void;
}

interface ICreditCardVerification {
  verifyCVV(): void;
  verifyExpiryDate(): void;
}

interface IBankVerification {
  verifyAccountNumber(): void;
}

interface IDigitalWalletVerification {
  verifyEmailOrPhone(): void;
}

class CreditCardPayment implements ICreditCardVerification, IPaymentProcess {
  payment(): void {
    console.log("Payment Process");
  }
  verifyCVV(): void {
    console.log("Verification for Credit Card");
  }
  verifyExpiryDate(): void {
    console.log("Verification for Credit Card");
  }
}

class BankPayment implements IBankVerification, IPaymentProcess {
  payment(): void {
    console.log("Payment Process");
  }
  verifyAccountNumber(): void {
    console.log("Payment Verify");
  }
}

class DigitalPayments implements IDigitalWalletVerification, IPaymentProcess {
  payment(): void {
    console.log("Payment Process");
  }
  verifyEmailOrPhone(): void {
    console.log("Payment Verify");
  }
}

const payment = new DigitalPayments().verifyEmailOrPhone();
