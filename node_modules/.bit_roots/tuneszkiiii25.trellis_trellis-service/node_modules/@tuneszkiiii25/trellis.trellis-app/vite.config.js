import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // The deployed app-bundle ships no node_modules, so the SSR build must
  // bundle react/react-dom/react-router in rather than leave them as
  // external imports (Vite's SSR build externalizes deps by default).
  ...(command === 'build'
    ? {
        ssr: {
          noExternal: ['react', 'react-dom', 'react-router', 'react-router-dom'],
        },
      }
    : {}),
}));
