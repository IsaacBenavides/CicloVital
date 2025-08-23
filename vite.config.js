// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: { global: {} },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/ws-chat': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        ws: true,
      },
      // (si usas el nativo para pruebas)
      '/ws-chat-native': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        ws: true,
      },
    },
  },
})
