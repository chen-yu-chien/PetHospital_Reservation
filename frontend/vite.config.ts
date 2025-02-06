import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 要捕獲的根路由
     '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    }
  }
})
