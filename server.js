import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Resolve static directory: support both dist and build
const staticDir = fs.existsSync(path.join(__dirname, 'dist'))
  ? path.join(__dirname, 'dist')
  : path.join(__dirname, 'build');

// Enable JSON body parsing for API endpoints
app.use(express.json());

// Serve built frontend assets
app.use(express.static(staticDir));

// Health check endpoint for Render monitoring
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'CogniLearn AI Bloom Platform',
    timestamp: new Date().toISOString(),
  });
});

// Express 5 compatible SPA fallback
app.use((req, res) => {
  const indexPath = fs.existsSync(path.join(staticDir, 'index.html'))
    ? path.join(staticDir, 'index.html')
    : path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`CogniLearn active and listening on port ${PORT} serving from ${staticDir}`);
});
