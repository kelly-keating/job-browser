import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: './src',
  base: './',
  plugins: [react()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    strictPort: true,
    port: 5173,
  },
  resolve: {
    alias: {
      '@models': path.resolve(__dirname, './models/index.ts'),
      '@': path.resolve(__dirname, './src'),
    },
  },
})
