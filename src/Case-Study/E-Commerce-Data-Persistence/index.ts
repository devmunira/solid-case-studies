interface IOrderRepository {
  create(dto: {}): void;
  update(): void;
  delete(): void;
  getAll(): void;
  getOne(): void;
}

class SQLOrderRepository implements IOrderRepository {
  create(dto: {}): void {
    console.log("SQL Order Processing....");
  }
  update(): void {
    console.log("SQL Order Processing....");
  }
  delete(): void {
    console.log("SQL Order Processing....");
  }
  getAll(): void {
    console.log("SQL Order Processing....");
  }
  getOne(): void {
    console.log("SQL Order Processing....");
  }
}

class NOSQLOrderRepository implements IOrderRepository {
  create(dto: {}): void {
    console.log("NoSQL Order Processing....");
  }
  update(): void {
    console.log("NoSQL Order Processing....");
  }
  delete(): void {
    console.log("NoSQL Order Processing....");
  }
  getAll(): void {
    console.log("NoSQL Order Processing....");
  }
  getOne(): void {
    console.log("NoSQL Order Processing....");
  }
}

class OrderService {
  private orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  createOrder(dto: {}): void {
    this.orderRepository.create(dto);
  }
}

enum OrderRepository {
  SQL,
  NOSQL,
  CACHE,
}

const useRepository = OrderRepository.NOSQL;

const useRepositoryForQuery: IOrderRepository =
  useRepository === OrderRepository.NOSQL
    ? new NOSQLOrderRepository()
    : new SQLOrderRepository();

const order = new OrderService(useRepositoryForQuery);
order.createOrder({});
