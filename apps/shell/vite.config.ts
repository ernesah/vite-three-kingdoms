import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    federation({
      name: 'shell',
      filename: 'remoteEntry.js',
      remotes: {
        auroria: 'http://localhost:4201/assets/remoteEntry.js',
        borealis: 'http://localhost:4202/assets/remoteEntry.js',
        cygnus: 'http://localhost:4203/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'styled-components'],
    }),
  ],
  server: {
    port: 4200,
  },
  build: {
    outDir: '../../dist/apps/shell',
    assetsDir: 'assets',
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
