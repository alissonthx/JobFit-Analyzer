import pdfParse from 'pdf-parse';

export interface PDFExtractionResult {
  text: string;
  metadata: {
    pageCount: number;
    language: string;
  };
}

export const extractTextFromPDF = async (pdfBuffer: Buffer): Promise<PDFExtractionResult> => {
  try {
    const data = await pdfParse(pdfBuffer);
    
    return {
      text: data.text,
      metadata: {
        pageCount: data.numpages || 1,
        language: 'en' // You can add language detection later
      }
    };
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to parse PDF file. Please ensure it\'s a valid PDF.');
  }
};

export const cleanExtractedText = (text: string): string => {
  // Remove excessive whitespace and clean up the text
  return text
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 10000); // Limit to first 10,000 characters to avoid token limits
};

// Optional: Helper function to validate PDF file
export const validatePDFFile = (file: Express.Multer.File): void => {
  if (!file) {
    throw new Error('No file provided');
  }

  if (file.mimetype !== 'application/pdf') {
    throw new Error('Only PDF files are allowed');
  }

  if (file.size > 5 * 1024 * 1024) { // 5MB limit
    throw new Error('File size must be less than 5MB');
  }

  if (file.buffer.length === 0) {
    throw new Error('File is empty');
  }
};