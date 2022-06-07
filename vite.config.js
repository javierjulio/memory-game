import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    // host: true, // Enable to expose host for running app on phone
    open: true
  },
  base: '/memory-game/' // use repo name https://vitejs.dev/guide/static-deploy.html#github-pages
})
