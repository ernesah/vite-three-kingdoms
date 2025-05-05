import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    federation({
      name: 'borealis',
      filename: 'remoteEntry.js',
      exposes: {
        './Component': './src/RemoteComponent.tsx',
      },
      shared: ['react', 'react-dom', 'styled-components'],
    }),
  ],
  server: {
    port: 4202,
  },
  build: {
    outDir: '../../dist/apps/borealis',
    assetsDir: 'assets',
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
