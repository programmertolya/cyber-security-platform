import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Убедитесь, что фронтенд работает здесь
    proxy: {
      '/api': {
        target: 'http://localhost:7073', // Порт вашего C# бэкенда
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      }
    }
  },
 build: {
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false, // Удаляет комментарии
      },
      compress: {
        drop_console: true, // Полезно: удаляет console.log из продакшена
      }
    } as any, // "as any" уберет ошибку "No overload matches"
  },
});