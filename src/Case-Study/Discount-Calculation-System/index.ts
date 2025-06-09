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
class Discount {
  applyDiscount(amount: number, discountStrategy: IDiscountStrategy): number {
    return discountStrategy.applyDiscount(amount);
  }
}

// Step 4: Client Code - Dynamically choose discount strategy
const amount = 1000;
const discountManager = new Discount();

const seasonalDiscount = discountManager.applyDiscount(
  100,
  new SeasonalDiscount()
);

const loyaltyDiscount = discountManager.applyDiscount(
  100,
  new LoyaltyDiscount()
);

const bulkDiscount = discountManager.applyDiscount(
  100,
  new BulkPurchaseDiscount()
);
