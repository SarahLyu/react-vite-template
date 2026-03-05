import path, { resolve } from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

const resolveAlias = (url: string) => {
  if (url.startsWith('@/')) {
    const resolvedPath = path.resolve(__dirname, 'src', url.slice(2));
    return new URL(`file://${resolvedPath}`);
  }
  return new URL(url, `file://${process.cwd()}/`);
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/_variables.scss" as *;`,
        importers: [
          {
            findFileUrl(url: string) {
              try {
                return resolveAlias(url);
              } catch (_e) {
                return null;
              }
            },
          },
        ],
      },
    },
  },
});
