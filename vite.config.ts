import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync } from 'fs';
import { join } from 'path';

// React Router paths that should fallback to index.html
const reactRoutes = ['/pricing'];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Middleware to handle routing
    {
      name: 'custom-routing',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url || '';

          // 1. Handle directory index for VitePress sites (/docs/, /blog/)
          if (url.endsWith('/') && (url.startsWith('/docs/') || url.startsWith('/blog/'))) {
            const indexPath = join(process.cwd(), 'public', url, 'index.html');
            if (existsSync(indexPath)) {
              req.url = url + 'index.html';
            }
          }

          // 2. Handle React Router paths - fallback to index.html
          if (reactRoutes.some(route => url === route || url.startsWith(route + '/'))) {
            req.url = '/index.html';
          }

          next();
        });
      },
    },
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Disable SPA fallback - we handle routing manually above
  appType: 'mpa',
});
