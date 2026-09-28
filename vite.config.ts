import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function assetServerPlugin(): Plugin {
  return {
    name: 'asset-server-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';

        if (url === '/api/asset-status' && req.method === 'GET') {
          try {
            const publicDir = path.resolve(__dirname, 'public');
            const imagesDir = path.join(publicDir, 'images');
            const portraitsDir = path.join(publicDir, 'portraits');

            const listDirSafe = (dir: string) => {
              if (!fs.existsSync(dir)) return [];
              return fs.readdirSync(dir).map((f) => {
                const stat = fs.statSync(path.join(dir, f));
                return { name: f, size: stat.size, mtime: stat.mtimeMs };
              });
            };

            const images = listDirSafe(imagesDir);
            const portraits = listDirSafe(portraitsDir);

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ images, portraits }));
            return;
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
            return;
          }
        }

        if (url === '/api/upload-asset' && req.method === 'POST') {
          try {
            const chunks: Buffer[] = [];
            req.on('data', (chunk) => chunks.push(chunk));
            req.on('end', () => {
              try {
                const raw = Buffer.concat(chunks).toString('utf-8');
                const { filename, folder, dataBase64 } = JSON.parse(raw);

                if (!filename || !dataBase64) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: 'Missing filename or dataBase64' }));
                  return;
                }

                // Strip data URL header if present
                const cleanBase64 = dataBase64.replace(/^data:image\/[a-z]+;base64,/, '');
                const buffer = Buffer.from(cleanBase64, 'base64');

                const publicDir = path.resolve(__dirname, 'public');
                const targetDir = folder === 'portraits' 
                  ? path.join(publicDir, 'portraits')
                  : path.join(publicDir, 'images');

                if (!fs.existsSync(targetDir)) {
                  fs.mkdirSync(targetDir, { recursive: true });
                }

                const targetPath = path.join(targetDir, path.basename(filename));
                fs.writeFileSync(targetPath, buffer);

                // Also copy to root public for direct root references
                if (folder !== 'portraits') {
                  fs.writeFileSync(path.join(publicDir, path.basename(filename)), buffer);
                }

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, filename, size: buffer.length }));
              } catch (parseErr: any) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: parseErr.message }));
              }
            });
            return;
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
            return;
          }
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), assetServerPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
