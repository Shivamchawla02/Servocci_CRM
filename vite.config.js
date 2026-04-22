import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'pdfjs-dist/build/pdf.worker.entry': 'pdfjs-dist/legacy/build/pdf.worker.entry',
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
