interface IOrderRepository {
  create(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  updateStatus(id: string, status: OrderStatus): Promise<Order>;
  findByCustomerId(customerId: string): Promise<Order[]>;
}

class SQLOrderRepository implements IOrderRepository {
  async create(order: Order): Promise<Order> {
    console.log("SQL Order Processing....");
    return order;
  }

  async findById(id: string): Promise<Order | null> {
    console.log("SQL Order Processing....");
    return null;
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    console.log("SQL Order Processing....");
    return {} as Order;
  }

  async findByCustomerId(customerId: string): Promise<Order[]> {
    console.log("SQL Order Processing....");
    return [];
  }
}

class NOSQLOrderRepository implements IOrderRepository {
  async create(order: Order): Promise<Order> {
    console.log("NoSQL Order Processing....");
    return order;
  }

  async findById(id: string): Promise<Order | null> {
    console.log("NoSQL Order Processing....");
    return null;
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    console.log("NoSQL Order Processing....");
    return {} as Order;
  }

  async findByCustomerId(customerId: string): Promise<Order[]> {
    console.log("NoSQL Order Processing....");
    return [];
  }
}

class OrderService {
  private orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  async createOrder(order: Order): Promise<Order> {
    return this.orderRepository.create(order);
  }
}

enum OrderRepositoryType {
  SQL,
  NOSQL,
  CACHE,
}

class RepositoryFactory {
  static createRepository(type: OrderRepositoryType): IOrderRepository {
    switch (type) {
      case OrderRepositoryType.SQL:
        return new SQLOrderRepository();
      case OrderRepositoryType.NOSQL:
        return new NOSQLOrderRepository();
      case OrderRepositoryType.CACHE:
        throw new Error("Cache repository not implemented yet");
      default:
        throw new Error("Invalid repository type");
    }
  }
}

// Example usage
const useRepository = OrderRepositoryType.NOSQL;
const useRepositoryForQuery: IOrderRepository =
  RepositoryFactory.createRepository(useRepository);

const order = new OrderService(useRepositoryForQuery);
const newOrder: Order = {
  id: "1",
  customerId: "123",
  items: [],
  status: OrderStatus.PENDING,
  totalAmount: 0,
  shippingAddress: {
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  },
  paymentId: "",
  shipmentId: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};
order.createOrder(newOrder);
