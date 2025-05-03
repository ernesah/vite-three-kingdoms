import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'cygnus',
      filename: 'remoteEntry.js',
      exposes: {
        './Component': './src/RemoteComponent.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    port: 4203,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
