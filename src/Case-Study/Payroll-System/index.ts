enum SALARY_TYPE {
  HOURLY = "Hourly",
  CONTRACT = "contract",
}

abstract class Employee {
  protected name: string;
  protected type: SALARY_TYPE;
  protected joiningDate: string;

  constructor(name: string, type: SALARY_TYPE, joiningDate: string) {
    this.name = name;
    this.type = type;
    this.joiningDate = joiningDate;
  }

  abstract calculateSalary(): void;
}

class HourlyEmployee extends Employee {
  private hourlyRate: number;
  private hours: number;

  constructor(
    hourlyRate: number,
    hours: number,
    name: string,
    type: SALARY_TYPE,
    joinDate: string
  ) {
    super(name, type, joinDate);
    this.hourlyRate = hourlyRate;
    this.hours = hours;
  }

  calculateSalary(): void {
    console.log(`${this.name} Salary: $${this.hourlyRate * this.hours}`);
  }
}

class FixedEmployee extends Employee {
  private fixedSalary: number;

  constructor(
    fixedSalary: number,
    name: string,
    type: SALARY_TYPE,
    joinDate: string
  ) {
    super(name, type, joinDate);
    this.fixedSalary = fixedSalary;
  }

  calculateSalary(): void {
    console.log(`${this.name} Salary: $${this.fixedSalary}`);
  }
}

function main() {
  const employees: Employee[] = [
    new HourlyEmployee(60, 160, "Munira", SALARY_TYPE.HOURLY, "12-12-2020"),
    new FixedEmployee(5000, "Hasan", SALARY_TYPE.CONTRACT, "12-12-2020"),
  ];

  employees.forEach((employee) => employee.calculateSalary());
}
