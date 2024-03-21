import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { existsSync, readdirSync, lstatSync, rmdirSync, unlinkSync } from 'fs';
// import vueJsx from '@vitejs/plugin-vue-jsx';
import VueMacros from 'unplugin-vue-macros/vite';

emptyDir(resolve(__dirname, 'dist'));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueMacros({
      plugins: {
        vue: vue(),
        //vueJsx: vueJsx()
      },
    }),
  ],
  build: {
    cssCodeSplit: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: 'src/entry.ts',
      name: 'VueStickyElement',
      formats: ['es', 'cjs', 'umd'],
      fileName(format) {
        let extension = 'js';
        if (format === 'es') {
          extension = 'm' + extension;
        } else if (format === 'cjs') {
          extension = 'c' + extension;
        }
        const fileName = `vue-sticky-element.${format}.${extension}`;
        return fileName;
      },
    },
    rollupOptions: {
      // make sure to externalize deps that should not be bundled
      // into your library
      input: {
        main: resolve(__dirname, 'src/entry.ts'),
      },
      external: ['vue'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'entry.css') return 'vue-sticky-element.css';
          return assetInfo.name as string;
        },
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'istanbul',
      reportsDirectory: './coverage/',
    },
  },
});

function emptyDir(dir: string): void {
  if (!existsSync(dir)) {
    return;
  }

  for (const file of readdirSync(dir)) {
    const abs = resolve(dir, file);

    // baseline is Node 12 so can't use rmSync
    if (lstatSync(abs).isDirectory()) {
      emptyDir(abs);
      rmdirSync(abs);
    } else {
      unlinkSync(abs);
    }
  }
}
