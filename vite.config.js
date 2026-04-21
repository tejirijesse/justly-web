import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves the site at /justly-web/. Override with VITE_BASE
// at build time for custom domains or alternate hosts.
// e.g. VITE_BASE=/ npm run build  — for Vercel / Netlify / root domain
const base = process.env.VITE_BASE ?? '/justly-web/'

export default defineConfig({
  base,
  plugins: [react()],
  server: { port: 5173, host: true },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
