import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-chunk': ['react', 'react-dom'],
          'nostr-tools-chunk': ['nostr-tools'],
        },
      },
    },
  },
});
