import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Project Pages URL: https://praxeon-r.github.io/praxeon-demo/
const base = process.env.GITHUB_PAGES === 'true' ? '/praxeon-demo/' : '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
