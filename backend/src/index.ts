import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PORT } from './config/env';
import chatRoutes from './routes/chatRoutes';
import { initializeVectorStore } from './services/documentService';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/load-document', async (req, res) => {
  const { documentPath } = req.body;
  if (!documentPath) {
    return res.status(400).json({ error: "documentPath is required in the request body." });
  }

  try {
    await initializeVectorStore(documentPath);
    res.status(200).json({ message: "Document processed and vector store initialized successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

const POLICY_DOCUMENT_PATH = path.join(__dirname, '../documents/policy.txt');

app.use('/api', chatRoutes);

app.listen(PORT, async () => { 
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  try {
    await initializeVectorStore(POLICY_DOCUMENT_PATH);
    console.log("Policy document loaded and vector store initialized on startup.");
  } catch (error) {
    console.error("Failed to preload policy document on startup:", error);
  }
});