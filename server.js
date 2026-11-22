import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable JSON body parsing for API endpoints
app.use(express.json());

// Serve built frontend assets
app.use(express.static(path.join(__dirname, 'dist')));

// Health check endpoint for Render Web Service monitoring
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'CogniLearn AI Bloom Platform',
    timestamp: new Date().toISOString(),
  });
});

// Express 5 compatible SPA fallback
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`CogniLearn Web Service active and listening on port ${PORT}`);
});
