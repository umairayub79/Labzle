import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";


const manifestForPlugin =  {
  registerType: "prompt",
  includeAssets: ["/public/favicon.ico", '/apple-touch-icon.png'],
  manifest: {
    name: "Labzle",
    short_name: "Labzle",
    description: "Balochi version of Wordle",
    icons: [
      {
        src: '/public/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: '/public/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/public/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: '/public/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: '/public/icon-152.png',
        sizes: '152',
        type: 'image/png',
      },
      {
        src: '/public/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/public/icon-384x38x.png',
        sizes: '384x38x',
        type: 'image/png',
      },
      {
        src: '/public/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
})
