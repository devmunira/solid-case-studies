// Logistics Delivery Routing System
//Design a system that calculates delivery routes. Different delivery types (express, standard, refrigerated) have different constraints. Constraints may be added dynamically (e.g., "avoid toll roads", "skip construction zones"). Multiple algorithms (Dijkstra, A*, Genetic) are used based on cost/need.

// Question:
// How do you abstract route generation and constraints?
// How would you structure the constraint system so it’s extensible at runtime?
// How do you plug in new algorithms without modifying existing code?

// class: ExpressDelivery, StandardDelivery, RefrigeratedDelivery, AvoidToll, SkipConstruction,
// interface: ICalculateDeliveryRoute, IConstraints

// ICalculateDeliveryRoute.ts
export interface ICalculateDeliveryRoute {
  calculate(): number;
}

// IConstraintHandler.ts
export interface IConstraintHandler {
  setNext(handler: IConstraintHandler): IConstraintHandler;
  handle(routeContext: RouteContext): void;
}

// IAlgorithm.ts
export interface IAlgorithm {
  applyAlgorithm(routeContext: RouteContext): number;
}

export enum ROUTE_STEPS {
  Start = "start",
  AvoidToll = "avoidToll",
  SkipConstruction = "skipConstruction",
  Destination = "destination",
}

// RouteContext.ts
export class RouteContext {
  public cost: number = 0;
  public path: ROUTE_STEPS[] = [];

  constructor() {
    this.path = [ROUTE_STEPS.Start];
  }

  addStep(step: ROUTE_STEPS) {
    this.path.push(step);
  }
}

// ConstraintHandlers.ts
export class BaseConstraintHandler implements IConstraintHandler {
  private nextHandler: IConstraintHandler | null = null;

  setNext(handler: IConstraintHandler): IConstraintHandler {
    this.nextHandler = handler;
    return handler;
  }

  handle(routeContext: RouteContext): void {
    if (this.nextHandler) {
      this.nextHandler.handle(routeContext);
    }
  }
}

export class AvoidTollHandler extends BaseConstraintHandler {
  handle(routeContext: RouteContext): void {
    routeContext.cost += 20;
    routeContext.addStep(ROUTE_STEPS.AvoidToll);
    super.handle(routeContext);
  }
}

export class SkipConstructionHandler extends BaseConstraintHandler {
  handle(routeContext: RouteContext): void {
    routeContext.cost += 10;
    routeContext.addStep(ROUTE_STEPS.SkipConstruction);
    super.handle(routeContext);
  }
}

// Algorithms.ts
export class DijkstraAlgorithm implements IAlgorithm {
  applyAlgorithm(routeContext: RouteContext): number {
    return routeContext.cost * 0.9;
  }
}

export class GeneticAlgorithm implements IAlgorithm {
  applyAlgorithm(routeContext: RouteContext): number {
    return routeContext.cost * 1.1;
  }
}

// AlgorithmFactory.ts
export class AlgorithmFactory {
  constructor(private cost: number) {}

  getAlgorithm(): IAlgorithm {
    if (this.cost > 100000) {
      return new DijkstraAlgorithm();
    } else {
      return new GeneticAlgorithm();
    }
  }
}

// ExpressDelivery.ts
export class ExpressDelivery implements ICalculateDeliveryRoute {
  private firstHandler: IConstraintHandler | null = null;
  private routeContext: RouteContext = new RouteContext();

  constructor(constraintChain: IConstraintHandler) {
    this.firstHandler = constraintChain;
  }

  calculate(): number {
    if (this.firstHandler) {
      this.firstHandler.handle(this.routeContext);
    }

    const algorithm = new AlgorithmFactory(
      this.routeContext.cost
    ).getAlgorithm();
    const finalCost = algorithm.applyAlgorithm(this.routeContext);

    this.routeContext.addStep(ROUTE_STEPS.Destination);
    console.log("Final Route:", this.routeContext.path.join(" -> "));
    console.log("Final Cost:", finalCost);

    return finalCost;
  }
}

// Build constraint chain (client code)
const avoidToll = new AvoidTollHandler();
const skipConstruction = new SkipConstructionHandler();
avoidToll.setNext(skipConstruction);

// Create delivery
const delivery = new ExpressDelivery(avoidToll);

// Calculate route
delivery.calculate();
