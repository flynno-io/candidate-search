import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './environment', // Specify the directory where the environment files are located
  plugins: [react()],
});
