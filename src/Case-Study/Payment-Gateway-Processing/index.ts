// IPaymentProcessor - Common Interface
interface IPaymentProcessor {
  processPayment(amount: number): void;
}

type Transaction = {
  amount: number;
  paymentType: "CreditCard" | "DebitCard" | "Digital";
};

class CreditCardPayment implements IPaymentProcessor {
  processPayment(amount: number) {
    console.log(`Processing Credit Card payment of $${amount}`);
  }
}

class DebitCardPayment implements IPaymentProcessor {
  processPayment(amount: number) {
    console.log(`Processing Debit Card payment of $${amount}`);
  }
}

class DigitalWalletPayment implements IPaymentProcessor {
  processPayment(amount: number) {
    console.log(`Processing Digital Wallet payment of $${amount}`);
  }
}

// Transaction Validator
class TransactionValidator {
  static validate(transaction: Transaction) {
    if (!transaction.amount || transaction.amount <= 0) {
      throw new Error("Invalid transaction amount");
    }
    console.log("Transaction validated successfully");
  }
}

// Bank Communicator (Simulated API call)
class BankCommunicator {
  static sendRequest({ paymentType, amount }: Transaction) {
    console.log(
      `Communicating with bank for ${paymentType} payment of $${amount}...`
    );
  }
}

// Transaction Logger
class TransactionLogger {
  static logTransaction(transaction: Transaction) {
    console.log(`Transaction Logged: ${JSON.stringify(transaction)}`);
  }
}

// Fraud Detection
class FraudDetection {
  static detectFraud(transaction: Transaction) {
    if (transaction.amount > 10000) {
      console.log("⚠️ Possible fraud detected!");
      return true;
    }
    return false;
  }
}

// Global Error Handler
class GlobalErrorHandler {
  static handleError(error: Error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

// Response Generator
class ResponseGenerator {
  static generateResponse(success: any, message: string) {
    return { success, message };
  }
}

// Report Generator
class ReportGenerator {
  static generateReport(transactions: Transaction) {
    console.log("📝 Generating transaction report...");
    console.table(transactions);
  }
}

class PaymentFactory2 {
  static getPaymentProcessor(type: Transaction["paymentType"]) {
    switch (type) {
      case "CreditCard":
        return new CreditCardPayment();
      case "DebitCard":
        return new DebitCardPayment();
      case "Digital":
        return new DigitalWalletPayment();
      default:
        throw new Error("Invalid payment type");
    }
  }
}

class PaymentFacade {
  static payment({ amount, paymentType }: Transaction) {
    // Simulating a payment process
    try {
      const paymentType: Transaction["paymentType"] = "CreditCard"; // Could be user input
      const transaction = { amount: 500, paymentType: paymentType };

      // Step 1: Validate the transaction
      TransactionValidator.validate(transaction);

      // Step 2: Detect fraud
      if (FraudDetection.detectFraud(transaction)) {
        throw new Error("Transaction flagged as fraud!");
      }

      // Step 3: Get the appropriate payment processor
      const paymentProcessor: IPaymentProcessor =
        PaymentFactory2.getPaymentProcessor(transaction.paymentType);

      // Step 4: Process payment
      paymentProcessor.processPayment(transaction.amount);

      // Step 5: Communicate with the bank
      BankCommunicator.sendRequest({
        paymentType: transaction.paymentType,
        amount: transaction.amount,
      });

      // Step 6: Log the transaction
      TransactionLogger.logTransaction(transaction);

      // Step 7: Generate a success response
      const response = ResponseGenerator.generateResponse(
        true,
        "Payment successful!"
      );
      console.log(response);
    } catch (error) {
      GlobalErrorHandler.handleError(error);
    }
  }
}

// Client Code
const data = PaymentFacade.payment({
  amount: 200,
  paymentType: "CreditCard",
});
