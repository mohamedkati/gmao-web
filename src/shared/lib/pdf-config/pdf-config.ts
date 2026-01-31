// src/lib/pdf-config.ts

import { pdfjs } from 'react-pdf';

// Configuration du worker PDF.js pour React-PDF v10
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}