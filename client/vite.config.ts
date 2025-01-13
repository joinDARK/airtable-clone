import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@api": path.resolve(__dirname, "./src/services/api"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@classes": path.resolve(__dirname, "./src/shared/classes"),
      "@components": path.resolve(__dirname, "./src/shared/components"),
      "@configs": path.resolve(__dirname, "./src/shared/configs"),
      "@hooks": path.resolve(__dirname, "./src/shared/hooks"),
      "@interfaces": path.resolve(__dirname, "./src/shared/interfaces"),
      "@pages": path.resolve(__dirname, "./src/shared/pages"),
      "@schema": path.resolve(__dirname, "./src/shared/schema"),
      "@store": path.resolve(__dirname, "./src/shared/store"),
      "@styles": path.resolve(__dirname, "./src/shared/styles"),
      "@shared_types": path.resolve(__dirname, "./src/shared/types")
    }
  }
});
