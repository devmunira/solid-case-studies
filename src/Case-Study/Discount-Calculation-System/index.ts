// Step 1: Create a common interface for discounts
interface IDiscountStrategy {
  applyDiscount(amount: number): number;
}

// Step 2: Implement different discount strategies
class SeasonalDiscount implements IDiscountStrategy {
  applyDiscount(amount: number): number {
    console.log("Applying Seasonal Discount...");
    return amount * 0.9;
  }
}

class LoyaltyDiscount implements IDiscountStrategy {
  applyDiscount(amount: number): number {
    console.log("Applying Loyalty Discount...");
    return amount * 0.85;
  }
}

class BulkPurchaseDiscount implements IDiscountStrategy {
  applyDiscount(amount: number): number {
    console.log("Applying Bulk Purchase Discount...");
    return amount * 0.8;
  }
}

// Step 3: Create a  class to apply the discount
class DiscountContext {
  private discountStrategy: IDiscountStrategy;

  constructor(discountStrategy: IDiscountStrategy) {
    this.discountStrategy = discountStrategy;
  }

  applyDiscount(amount: number): number {
    return this.discountStrategy.applyDiscount(amount);
  }
}

// Step 4: Client Code - Dynamically choose discount strategy
const amount = 1000;

const seasonalDiscount = new DiscountContext(new SeasonalDiscount());
console.log(seasonalDiscount.applyDiscount(amount));

const loyaltyDiscount = new DiscountContext(new LoyaltyDiscount());
console.log(loyaltyDiscount.applyDiscount(amount));

const bulkDiscount = new DiscountContext(new BulkPurchaseDiscount());
console.log(bulkDiscount.applyDiscount(amount));
