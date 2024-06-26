import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import process from 'node:process'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT ?? 8080
  }
})
