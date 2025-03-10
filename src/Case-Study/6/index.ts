// Base Vehicle Class - Only common properties/methods
abstract class Vehicle {
  protected speed: number;

  constructor(speed: number) {
    this.speed = speed;
  }

  abstract getMaxSpeed(): number;

  calculateSpeed(): string {
    return this.speed > this.getMaxSpeed()
      ? `Speed exceeds the limit of ${this.getMaxSpeed()} km/h!`
      : `Current speed: ${this.speed} km/h`;
  }
}

// Interface for land vehicles (Bike, Car)
interface ILandVehicle {
  startEngine(): void;
  stopEngine(): void;
}

interface IPaddelVechicle {
  paddle(): string;
}

// LandVehicle Abstract Class (For Bike, Car)
abstract class LandVehicle extends Vehicle implements ILandVehicle {
  startEngine(): void {
    console.log("Engine started.");
  }

  stopEngine(): void {
    console.log("Engine stopped.");
  }
}

// AirVehicle Abstract Class (For Airplane)
abstract class AirVehicle extends Vehicle {
  checkAltitude(): string {
    return "Checking altitude...";
  }
}

// Subclass: Bike
class Bike extends LandVehicle implements IPaddelVechicle {
  getMaxSpeed(): number {
    return 80; // Max speed for bikes
  }

  paddle(): string {
    return "Paddle";
  }
}

// Subclass: Scooter
class scooter extends LandVehicle implements IPaddelVechicle {
  getMaxSpeed(): number {
    return 50;
  }

  paddle(): string {
    return "Scooter Paddle";
  }
}

// Subclass: Car
class Car extends LandVehicle {
  getMaxSpeed(): number {
    return 200; // Max speed for cars
  }
}

// Subclass: Airplane
class Airplane extends AirVehicle {
  getMaxSpeed(): number {
    return 900; // Max speed for airplanes
  }
}

const bike = new Bike(60);
console.log(bike.calculateSpeed());
bike.calculateSpeed();

const car = new Car(120);
car.startEngine();

const airplane = new Airplane(850);
console.log(airplane.calculateSpeed());
console.log(airplane.checkAltitude());
