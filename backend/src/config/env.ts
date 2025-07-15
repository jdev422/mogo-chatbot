import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT ?? '3000';
export const OLLAMA_URL = process.env.OLLAMA_URL ?? 'http://localhost:11434/api/generate';