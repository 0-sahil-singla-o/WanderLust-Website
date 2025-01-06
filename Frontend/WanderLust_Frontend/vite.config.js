import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import {staticCopy} from 'vite-plugin-static-copy';
import { viteStaticCopy } from 'vite-plugin-static-copy'
// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/static.json', // Path to your static.json file
          dest: '.',              // This will copy it to the root of the dist folder
        }
      ]
    })
  ],
})
