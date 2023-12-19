import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import tsconfigPaths from 'vite-tsconfig-paths';
import replace from '@rollup/plugin-replace';



// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    //FIX AWS-Amplify Error
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
      'xmlhttprequest-ssl': './node_modules/engine.io-client/lib/xmlhttprequest.js',
    },
  },
  plugins: [
    react(), 
    tsconfigPaths(),
    replace({
      preventAssignment: true,
      values: {
        'process.env': 'import.meta.env',
      },
    }),
    svgr({
      // A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should include. By default all svg files will be included.
      include: "**/*.svg?react",
    })
  ],
  envPrefix: 'REACT_APP_',
  server: {
    open: true,
    port: 7080,
  },
  preview: {
    port: 5000,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        intro: 'if(exports === undefined){var exports ={}; var self = {}}',
      },
    },
    target: ['esnext'],
  },
})
