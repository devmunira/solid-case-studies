// Background: An e-commerce platform manages products with various types, such as physical goods,
// digital downloads, and services. Physical goods need methods for shipping, inventory tracking,
// and delivery, while digital products only require download and licensing methods.
// Service-based products may need scheduling functionality. The product interface should
// avoid imposing irrelevant methods on different product types.

// Question: How would you design interfaces for these different product types?

class Product {
  constructor(protected name: string, protected price: number) {}

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }
}

interface IShippable {
  ship(): void;
  trackInventory(): void;
}

interface IDownloadable {
  download(): void;
  getLicense(): void;
}

interface ISchedulable {
  schedule(): void;
}

class PhysicalProduct implements IShippable {
  private product: Product;

  constructor(name: string, price: number) {
    this.product = new Product(name, price);
  }

  ship(): void {
    console.log(`${this.product.getName()} is being shipped.`);
  }

  trackInventory(): void {
    console.log(`Tracking inventory for ${this.product.getName()}.`);
  }
}

class DigitalProduct extends Product implements IDownloadable {
  constructor(name: string, price: number) {
    super(name, price);
  }

  download(): void {
    console.log(`Downloading ${this.name}.`);
  }

  getLicense(): void {
    console.log(` license for ${this.name}.`);
  }
}

class ServiceProduct extends Product implements ISchedulable {
  constructor(name: string, price: number) {
    super(name, price);
  }

  schedule(): void {
    console.log(`Scheduling for ${this.name}.`);
  }
}

const laptop = new PhysicalProduct("Laptop", 1000);
const ebook = new DigitalProduct("E-Book", 20);
const cleaningService = new ServiceProduct("Home Cleaning", 50);

laptop.ship();
laptop.trackInventory();

ebook.download();
ebook.getLicense();

cleaningService.schedule();

// ===================================== //

interface IProduct {
  getName(): string;
  getPrice(): number;
}

interface IPhysicalProduct {
  shipping(): void;
  inventoryTracking(): void;
  delivery(): void;
}

interface IDigitalProduct {
  download(): void;
  licensing(): void;
}

interface IServiceProduct {
  scheduling(): void;
}

class PhysicalProducts implements IProduct, IPhysicalProduct {
  private name: string;
  private price: number;
  private type: string; // Should be Enum I will add later

  constructor(name: string, price: number, type: string) {
    this.name = name;
    this.price = price;
    this.type = type;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  shipping(): void {
    console.log(`${this.name} is shipping...`);
  }

  inventoryTracking(): void {
    console.log(`${this.name} - Inventory Tracked`);
  }

  delivery(): void {
    console.log(`${this.name} - Delivered...`);
  }
}

class DigitalProducts implements IProduct, IDigitalProduct {
  private name: string;
  private price: number;
  private type: string;

  constructor(name: string, price: number, type: string) {
    this.name = name;
    this.price = price;
    this.type = type;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  download(): void {
    console.log(`${this.name} - Delivered...`);
  }

  licensing(): void {
    console.log("licensing");
  }
}

// Client Code
function main() {
  const physicalProduct = new PhysicalProducts("Watch", 30.0, "Physical");
  physicalProduct.shipping();
  physicalProduct.getName();

  const digitalProduct = new DigitalProducts("Watch", 30.0, "Digital");
  digitalProduct.licensing();
  digitalProduct.getName();
}
