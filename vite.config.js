import { defineConfig } from 'vite'

export default defineConfig({
  base: '/12/', // <- dla GitHub Pages
  build: {
    outDir: 'dist',
  },
})