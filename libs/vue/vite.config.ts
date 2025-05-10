/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 */
import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export function resolve(_path: string) {
  return path.join(process.cwd(), _path);
}

export default defineConfig({
  base: './',
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve('src/index.ts'),
      name: 'prop-styles',
      fileName: (format) => `index.${format}.js`,
    },
    outDir: resolve('./dist'),
    rollupOptions: {
      external: ['vue'],
    },
  },
  test: {
    environment: 'jsdom',
  },
});
