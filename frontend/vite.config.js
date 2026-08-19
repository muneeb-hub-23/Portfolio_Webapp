import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'fs'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-web-config',
      closeBundle() {
        // Only copy web.config when it exists (IIS deployments); skip in Docker
        if (existsSync('web.config')) {
          copyFileSync('web.config', 'dist/web.config')
        }
      }
    }
  ],
  server: {
    port: 3000,
    host: true
  }
})
