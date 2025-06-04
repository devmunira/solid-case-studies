// ### Online Store Backend

// **Background:** An online store needs a backend to handle order placement, track payment, and manage shipment information. Each order involves checking inventory, processing payments, and updating shipment status. The system should also notify customers of order status changes and generate invoices for each order.

// DTOs and Models
interface Customer {
  id: string;
  name: string;
  email: string;
  address: Address;
  phone: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  stockQuantity: number;
  category: string;
}

interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  shippingAddress: Address;
  paymentId: string;
  shipmentId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Payment {
  id: string;
  orderId: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  transactionId: string;
  createdAt: Date;
}

interface Shipment {
  id: string;
  orderId: string;
  status: ShipmentStatus;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface Invoice {
  id: string;
  orderId: string;
  customerId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  createdAt: Date;
}

enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

enum PaymentMethod {
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  PAYPAL = "PAYPAL",
  BANK_TRANSFER = "BANK_TRANSFER",
}

enum ShipmentStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
  FAILED = "FAILED",
}

// ================================================

// Interfaces
interface IProductRepository {
  findById(id: string): Promise<Product | null>;
  updateStock(id: string, quantity: number): Promise<void>;
  checkAvailability(id: string, quantity: number): Promise<boolean>;
}

interface IOrderRepository {
  create(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  updateStatus(id: string, status: OrderStatus): Promise<Order>;
  findByCustomerId(customerId: string): Promise<Order[]>;
}

interface IPaymentService {
  processPayment(payment: Payment): Promise<Payment>;
  refundPayment(paymentId: string): Promise<Payment>;
  getPaymentStatus(paymentId: string): Promise<PaymentStatus>;
}

interface IShipmentService {
  createShipment(order: Order): Promise<Shipment>;
  updateStatus(shipmentId: string, status: ShipmentStatus): Promise<Shipment>;
  getTrackingInfo(shipmentId: string): Promise<Shipment>;
}

interface INotificationService {
  sendOrderConfirmation(order: Order): Promise<void>;
  sendShipmentUpdate(shipment: Shipment): Promise<void>;
  sendPaymentConfirmation(payment: Payment): Promise<void>;
}

interface IInvoiceService {
  generateInvoice(order: Order): Promise<Invoice>;
  sendInvoice(invoice: Invoice): Promise<void>;
}

// ================================================

// Implementations
class ProductRepository implements IProductRepository {
  async findById(id: string): Promise<Product | null> {
    // Implementation
    return null;
  }

  async updateStock(id: string, quantity: number): Promise<void> {
    // Implementation
  }

  async checkAvailability(id: string, quantity: number): Promise<boolean> {
    // Implementation
    return true;
  }
}

class OrderRepository implements IOrderRepository {
  async create(order: Order): Promise<Order> {
    // Implementation
    return order;
  }

  async findById(id: string): Promise<Order | null> {
    // Implementation
    return null;
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    // Implementation
    return {} as Order;
  }

  async findByCustomerId(customerId: string): Promise<Order[]> {
    // Implementation
    return [];
  }
}

class PaymentService implements IPaymentService {
  async processPayment(payment: Payment): Promise<Payment> {
    // Implementation
    return payment;
  }

  async refundPayment(paymentId: string): Promise<Payment> {
    // Implementation
    return {} as Payment;
  }

  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    // Implementation
    return PaymentStatus.PENDING;
  }
}

class ShipmentService implements IShipmentService {
  async createShipment(order: Order): Promise<Shipment> {
    // Implementation
    return {} as Shipment;
  }

  async updateStatus(
    shipmentId: string,
    status: ShipmentStatus
  ): Promise<Shipment> {
    // Implementation
    return {} as Shipment;
  }

  async getTrackingInfo(shipmentId: string): Promise<Shipment> {
    // Implementation
    return {} as Shipment;
  }
}

class NotificationService implements INotificationService {
  async sendOrderConfirmation(order: Order): Promise<void> {
    // Implementation
  }

  async sendShipmentUpdate(shipment: Shipment): Promise<void> {
    // Implementation
  }

  async sendPaymentConfirmation(payment: Payment): Promise<void> {
    // Implementation
  }
}

class InvoiceService implements IInvoiceService {
  async generateInvoice(order: Order): Promise<Invoice> {
    // Implementation
    return {} as Invoice;
  }

  async sendInvoice(invoice: Invoice): Promise<void> {
    // Implementation
  }
}

// Main Service that orchestrates the process
class OrderManagementService {
  constructor(
    private productRepository: IProductRepository,
    private orderRepository: IOrderRepository,
    private paymentService: IPaymentService,
    private shipmentService: IShipmentService,
    private notificationService: INotificationService,
    private invoiceService: IInvoiceService
  ) {}

  async placeOrder(
    customerId: string,
    items: OrderItem[],
    shippingAddress: Address,
    paymentMethod: PaymentMethod
  ): Promise<Order> {
    // Implementation
    return {} as Order;
  }

  async processPayment(orderId: string): Promise<Payment> {
    // Implementation
    return {} as Payment;
  }

  async updateShipmentStatus(
    orderId: string,
    status: ShipmentStatus
  ): Promise<Shipment> {
    // Implementation
    return {} as Shipment;
  }

  async cancelOrder(orderId: string): Promise<Order> {
    // Implementation
    return {} as Order;
  }
}

// ================================================

// Client side usage
const productRepository = new ProductRepository();
const orderRepository = new OrderRepository();
const paymentService = new PaymentService();
const shipmentService = new ShipmentService();
const notificationService = new NotificationService();
const invoiceService = new InvoiceService();

const orderManagementService = new OrderManagementService(
  productRepository,
  orderRepository,
  paymentService,
  shipmentService,
  notificationService,
  invoiceService
);

// Example usage
const customer: Customer = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  address: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    country: "USA",
    zipCode: "10001",
  },
  phone: "+1234567890",
};

const orderItems: OrderItem[] = [
  {
    productId: "1",
    quantity: 2,
    unitPrice: 29.99,
    totalPrice: 59.98,
  },
];

// Place an order
orderManagementService.placeOrder(
  customer.id,
  orderItems,
  customer.address,
  PaymentMethod.CREDIT_CARD
);
