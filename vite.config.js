import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: './src',
  base: './',
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    // emptyOutDir: true,
  },
  server: {
    strictPort: true,
    port: 5173,
  },
})
