import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {prerenderRoutes} from './scripts/prerender-routes';

export default defineConfig(() => {
  return {
    // BASE_PATH is set by .github/workflows/deploy.yml for GitHub Pages
    // (project sites live at /Portfolio/). Defaults to '/' for local dev
    // and for hosts that serve at the root (Vercel, Netlify, custom domains).
    base: process.env.BASE_PATH || '/',
    // prerenderRoutes() writes a real /work/<slug>/ HTML file per project after
    // the bundle lands, so every case study has its own shareable metadata.
    plugins: [react(), tailwindcss(), prerenderRoutes()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
