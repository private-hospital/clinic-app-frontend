import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Unfonts from 'unplugin-fonts/vite';

export default defineConfig({
  define: {
    'process.env': process.env,
  },
  plugins: [
    react(),
    Unfonts({
      custom: {
        families: [
          {
            name: 'TTNormsPro',
            local: 'TTNormsPro',
            src: './src/assets/fonts/TTNormsPro/*.otf',
          },
          {
            name: 'MazzardH',
            local: 'MazzardH',
            src: './src/assets/fonts/MazzardH/*.otf',
          },
        ],
        injectTo: 'head-prepend',
        preload: true,
        display: 'swap',
      },
    }),
  ],
});
