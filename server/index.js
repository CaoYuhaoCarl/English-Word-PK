import express from 'express';
import { createServer } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function createApp() {
  const app = express();
  
  // Create Vite server in middleware mode
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  // Use vite's connect instance as middleware
  app.use(vite.middlewares);
  
  app.use(express.json());

  // Serve static files from the build directory in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(join(__dirname, '../dist')));
  }

  const port = process.env.PORT || 5173;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

createApp().catch(console.error);