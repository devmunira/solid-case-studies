// **Background:** A multi-functional printer can print, scan, copy, and fax. However, some models are simpler and only support printing and scanning, while others support all four functions. The printer's interface should not force simpler models to implement unnecessary methods.

// Interfaces for different printer functionalities
interface IPrinter {
  print(document: string): Promise<void>;
  getPrinterStatus(): Promise<string>;
}

interface IScanner {
  scan(document: string): Promise<string>;
  getScannerStatus(): Promise<string>;
}

interface ICopier {
  copy(document: string): Promise<void>;
  getCopierStatus(): Promise<string>;
}

interface IFax {
  sendFax(document: string, recipient: string): Promise<void>;
  receiveFax(): Promise<string>;
  getFaxStatus(): Promise<string>;
}

// Base printer class with common functionality
abstract class BasePrinter {
  protected model: string;
  protected status: string;

  constructor(model: string) {
    this.model = model;
    this.status = "ready";
  }

  protected async checkStatus(): Promise<boolean> {
    return this.status === "ready";
  }
}

// Basic printer that only supports printing
class BasicPrinter extends BasePrinter implements IPrinter {
  async print(document: string): Promise<void> {
    if (await this.checkStatus()) {
    } else {
      throw new Error("Printer is not ready");
    }
  }

  async getPrinterStatus(): Promise<string> {
    return this.status;
  }
}

// Printer with scanning capability
class PrinterWithScanner extends BasicPrinter implements IScanner {
  async scan(document: string): Promise<string> {
    if (await this.checkStatus()) {
      return `Scanned ${document}`;
    }
    throw new Error("Scanner is not ready");
  }

  async getScannerStatus(): Promise<string> {
    return this.status;
  }
}

// Full-featured multi-functional printer
class MultiFunctionalPrinter
  extends PrinterWithScanner
  implements ICopier, IFax
{
  async copy(document: string): Promise<void> {
    // implement copy functionality
  }

  async getCopierStatus(): Promise<string> {
    return this.status;
  }

  async sendFax(document: string, recipient: string): Promise<void> {
    // implement send fax functionality
  }

  async receiveFax(): Promise<string> {
    // implement receive fax functionality
    return "Received fax content";
  }

  async getFaxStatus(): Promise<string> {
    return this.status;
  }
}

// Factory for creating different types of printers
class PrinterFactory {
  static createPrinter(type: "basic" | "scanner" | "multifunction"): IPrinter {
    switch (type) {
      case "basic":
        return new BasicPrinter("Basic Printer");
      case "scanner":
        return new PrinterWithScanner("Printer with Scanner");
      case "multifunction":
        return new MultiFunctionalPrinter("Multi-Functional Printer");
      default:
        throw new Error("Invalid printer type");
    }
  }
}

// Example usage
async function main() {
  // Create different types of printers
  const basicPrinter = PrinterFactory.createPrinter("basic");
  const scannerPrinter = PrinterFactory.createPrinter(
    "scanner"
  ) as PrinterWithScanner;
  const multiPrinter = PrinterFactory.createPrinter(
    "multifunction"
  ) as MultiFunctionalPrinter;

  // Use basic printer
  await basicPrinter.print("Document1.pdf");

  // Use scanner printer
  await scannerPrinter.print("Document2.pdf");
  const scannedDoc = await scannerPrinter.scan("Document3.pdf");

  // Use multi-functional printer
  await multiPrinter.print("Document4.pdf");
  await multiPrinter.scan("Document5.pdf");
  await multiPrinter.copy("Document6.pdf");
  await multiPrinter.sendFax("Document7.pdf", "+1234567890");
  const receivedFax = await multiPrinter.receiveFax();
}

main().catch(console.error);
