import path, { resolve } from 'path';

import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type PluginOption } from 'vite';
import svgr from 'vite-plugin-svgr';

const resolveAlias = (url: string) => {
  if (url.startsWith('@/')) {
    const resolvedPath = path.resolve(__dirname, 'src', url.slice(2));
    return new URL(`file://${resolvedPath}`);
  }
  return new URL(url, `file://${process.cwd()}/`);
};

// 判断是否需要分析包大小
const isAnalyze = process.env.ANALYZE === 'true';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  define: {
    __USE_MOCK__: JSON.stringify(process.env.USE_MOCK === 'true'),
  },
  plugins: [
    react(),
    svgr({ include: '**/*.svg' }),
    // 包分析插件（仅在 ANALYZE=true 时启用）
    isAnalyze
      ? (visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
          filename: 'dist/stats.html', // 输出文件路径
        }) as PluginOption)
      : null,
  ],
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
  // 依赖预构建优化
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router', 'react-error-boundary', 'axios'],
  },
  build: {
    emptyOutDir: true,
    cssCodeSplit: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router', 'react-error-boundary'],
          'utils-vendor': ['axios'],
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const infoName = assetInfo.names?.[0] ?? '';
          // 图片文件
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(infoName)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          // CSS 文件
          if (/\.css$/i.test(infoName)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          // 字体文件
          if (/\.(woff2?|eot|ttf|otf)$/i.test(infoName)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    assetsInlineLimit: 4096,
    sourcemap: false,
  },
  esbuild: mode === 'production' ? { drop: ['console', 'debugger'] } : undefined,
}));
