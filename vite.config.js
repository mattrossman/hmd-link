import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import twindJsx from '@twind/vite-plugin-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [twindJsx(), preact()],
  resolve: {
    alias: {
      '@': __dirname,
    },
  },
})
