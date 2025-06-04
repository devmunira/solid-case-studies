// Spacecraft Command System (Inspired by NASA)
// Scenario:
// Design a system that handles commands sent to spacecraft. Commands differ depending on the target (rover, satellite, lander) and evolve with mission types. Some commands are timed, others are immediate. All commands must be logged, validated, and simulated before execution.
// Question:
// What are your abstractions for "command", "target", and "execution"?
// How do you ensure new spacecraft types can be added without modifying the system?
// How do you isolate logging and validation?
// What interfaces would you create?

interface ICommand {
  executeCommand(): void;
}

interface ILog {
  log(module: LogModuleType, request: string, response: string): void;
}

interface IValidation {
  isValid(): boolean;
}

interface ISimulate {
  isSimulate(): boolean;
}

enum CommandExecutionType {
  INSTANT = "instant",
  TIMED = "timed",
}

enum LogModuleType {
  RoverCommand = "RoverCommand",
  LanderCommand = "LanderCommand",
  SatelliteCommand = "SatelliteCommand",
}

enum CommandType {
  RoverCommand = "RoverCommand",
  LanderCommand = "LanderCommand",
  SatelliteCommand = "SatelliteCommand",
}

class CommandLog implements ILog {
  log(module: LogModuleType, requestParams: string, responseBody: string) {}
}

class RoverValidationSchema implements IValidation {
  isValid() {
    return true;
  }
}

class SatelliteValidationSchema implements IValidation {
  isValid() {
    return true;
  }
}

class LanderValidationSchema implements IValidation {
  isValid() {
    return true;
  }
}

class RoverSimulateClass implements ISimulate {
  isSimulate(): boolean {
    return true;
  }
}

class SatelliteSimulateClasss implements ISimulate {
  isSimulate(): boolean {
    return true;
  }
}

class LanderSimulateClass implements ISimulate {
  isSimulate(): boolean {
    return true;
  }
}

abstract class Command implements ICommand {
  protected cmd: string;
  protected commandExecutionType: CommandExecutionType;
  protected commandExecutionTime: string;

  constructor(
    cmd: string,
    commandExecutionType: CommandExecutionType = CommandExecutionType.INSTANT,
    commandExecutionTime: string = new Date().toISOString()
  ) {
    this.cmd = cmd;
    this.commandExecutionTime = commandExecutionTime;
    this.commandExecutionType = commandExecutionType;
  }

  abstract executeCommand(): void;
}

class RoverCommand extends Command {
  executeCommand() {}
}

class LanderCommand extends Command {
  private landerValidationSchema: IValidation;
  private landerSimulateClass: ISimulate;
  private commandLog: ILog;

  constructor(
    cmd: string,
    commandExecutionType: CommandExecutionType = CommandExecutionType.INSTANT,
    commandExecutionTime: string = new Date().toISOString(),
    landerValidationSchema: IValidation,
    landerSimulateClass: ISimulate,
    commandLog: ILog
  ) {
    super(cmd, commandExecutionType, commandExecutionTime);
    this.landerValidationSchema = landerValidationSchema;
    this.landerSimulateClass = landerSimulateClass;
    this.commandLog = commandLog;
  }

  executeCommand() {
    // validate
    this.landerValidationSchema.isValid();

    // simulate
    this.landerSimulateClass.isSimulate();

    // execute
    if (this.commandExecutionType === CommandExecutionType.INSTANT) {
      // execute command
    } else {
      // set command on corn job.
    }

    // logged
    this.commandLog.log(
      LogModuleType.LanderCommand,
      JSON.stringify({}),
      JSON.stringify({})
    );
  }
}

class SatelliteCommand extends Command {
  executeCommand() {}
}

class CommandFactory {
  private commandType: CommandType;

  constructor(commandType: CommandType) {
    this.commandType = commandType;
  }

  getCommand(
    cmd: string,
    commandExecutionType: CommandExecutionType = CommandExecutionType.INSTANT,
    commandExecutionTime: string = new Date().toISOString()
  ) {
    switch (this.commandType) {
      case CommandType.LanderCommand:
        return new LanderCommand(
          cmd,
          commandExecutionType,
          commandExecutionTime,
          new LanderValidationSchema(),
          new LanderSimulateClass(),
          new CommandLog()
        );
      case CommandType.RoverCommand:
        return new RoverCommand(
          cmd,
          commandExecutionType,
          commandExecutionTime
        );

      case CommandType.SatelliteCommand:
        return new SatelliteCommand(
          cmd,
          commandExecutionType,
          commandExecutionTime
        );

      default:
        throw new Error("InValid Command");
    }
  }
}

const LanderCommandClass = new CommandFactory(
  CommandType.LanderCommand
).getCommand("run rover engine");

LanderCommandClass.executeCommand();
