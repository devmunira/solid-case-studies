// **Background:** A document processing tool converts documents between various formats (e.g., PDF, Word, HTML). As user demands increase, the tool needs to support additional formats, such as XML, JSON, or even audio formats. These new conversions must be added without modifying the existing code that handles current formats.

// Interfaces
interface IDocument {
  content: string;
  format: DocumentFormat;
  metadata: DocumentMetadata;
}

interface DocumentMetadata {
  title: string;
  author: string;
  createdAt: Date;
  lastModified: Date;
}

interface IDocumentConverter {
  convert(
    document: IDocument,
    targetFormat: DocumentFormat
  ): Promise<IDocument>;
  canConvert(
    sourceFormat: DocumentFormat,
    targetFormat: DocumentFormat
  ): boolean;
}

// Enums
enum DocumentFormat {
  PDF = "PDF",
  DOCX = "DOCX",
  HTML = "HTML",
  XML = "XML",
  JSON = "JSON",
  TXT = "TXT",
}

//  implementations
class PDFConverter implements IDocumentConverter {
  async convert(
    document: IDocument,
    targetFormat: DocumentFormat
  ): Promise<IDocument> {
    // In a real implementation, we would use a PDF processing library right now I am not focusing on business logic
    return {
      ...document,
      format: targetFormat,
      content: `Converted ${document.content} to ${targetFormat}`,
    };
  }

  canConvert(
    sourceFormat: DocumentFormat,
    targetFormat: DocumentFormat
  ): boolean {
    return (
      sourceFormat === DocumentFormat.PDF &&
      [DocumentFormat.DOCX, DocumentFormat.HTML, DocumentFormat.TXT].includes(
        targetFormat
      )
    );
  }
}

class WordConverter implements IDocumentConverter {
  async convert(
    document: IDocument,
    targetFormat: DocumentFormat
  ): Promise<IDocument> {
    // In a real implementation, we would use a Word processing library right now I am not focusing on business logic
    return {
      ...document,
      format: targetFormat,
      content: `Converted ${document.content} to ${targetFormat}`,
    };
  }

  canConvert(
    sourceFormat: DocumentFormat,
    targetFormat: DocumentFormat
  ): boolean {
    return (
      sourceFormat === DocumentFormat.DOCX &&
      [DocumentFormat.PDF, DocumentFormat.HTML, DocumentFormat.TXT].includes(
        targetFormat
      )
    );
  }
}

class HTMLConverter implements IDocumentConverter {
  async convert(
    document: IDocument,
    targetFormat: DocumentFormat
  ): Promise<IDocument> {
    // In a real implementation, we would use an HTML processing library right now I am not focusing on business logic
    return {
      ...document,
      format: targetFormat,
      content: `Converted ${document.content} to ${targetFormat}`,
    };
  }

  canConvert(
    sourceFormat: DocumentFormat,
    targetFormat: DocumentFormat
  ): boolean {
    return (
      sourceFormat === DocumentFormat.HTML &&
      [
        DocumentFormat.PDF,
        DocumentFormat.DOCX,
        DocumentFormat.XML,
        DocumentFormat.TXT,
      ].includes(targetFormat)
    );
  }
}

// Factory for creating converters
class ConverterFactory {
  private static converters: Map<DocumentFormat, IDocumentConverter> =
    new Map();

  static {
    this.converters.set(DocumentFormat.PDF, new PDFConverter());
    this.converters.set(DocumentFormat.DOCX, new WordConverter());
    this.converters.set(DocumentFormat.HTML, new HTMLConverter());
  }

  static getConverter(format: DocumentFormat): IDocumentConverter {
    const converter = this.converters.get(format);
    if (!converter) {
      throw new Error(`No converter available for format: ${format}`);
    }
    return converter;
  }

  static registerConverter(
    format: DocumentFormat,
    converter: IDocumentConverter
  ): void {
    this.converters.set(format, converter);
  }
}

// Document processing service
class DocumentProcessingService {
  async convertDocument(
    document: IDocument,
    targetFormat: DocumentFormat
  ): Promise<IDocument> {
    const converter = ConverterFactory.getConverter(document.format);

    if (!converter.canConvert(document.format, targetFormat)) {
      throw new Error(
        `Cannot convert from ${document.format} to ${targetFormat}`
      );
    }

    return converter.convert(document, targetFormat);
  }
}

// Example usage
async function main() {
  const documentService = new DocumentProcessingService();

  // Create a sample document
  const document: IDocument = {
    content: "Sample document content",
    format: DocumentFormat.PDF,
    metadata: {
      title: "Sample Document",
      author: "Munira Akter",
      createdAt: new Date(),
      lastModified: new Date(),
    },
  };

  try {
    // Convert PDF to HTML
    const htmlDocument = await documentService.convertDocument(
      document,
      DocumentFormat.HTML
    );

    // Convert HTML to DOCX
    const docxDocument = await documentService.convertDocument(
      htmlDocument,
      DocumentFormat.DOCX
    );
  } catch (error) {
    console.error("Conversion error:", error);
  }
}

main().catch(console.error);
