import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: './src',
  base: './',
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    // emptyOutDir: true,
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    strictPort: true,
    port: 5173,
  },
})
