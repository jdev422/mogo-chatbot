# 🧠 Mogo Document-Based Chatbot

## 🖼️ Preview
<img src="https://github.com/jdev422/mogo-chatbot/blob/main/frontend/public/screenshot.png" alt="Chatbot Screenshot" width="700" />


This project is a simple, local chatbot web app that can answer questions based on a reference document using local LLMs and embeddings. Built with:

- ⚙️ Node.js backend using Langchain + Ollama
- 💬 React/NextJS TypeScript frontend
- 🧩 Local LLM (LLaMA3) via Ollama
- 📚 Vector search with embedded document chunks

---

## 📦 Features

### ✅ Milestone 1
- Simple chat interface
- Preloads and embeds a reference document
- Context-aware answers with citations
- Runs entirely locally (no OpenAI required)

### ✨ Milestone 2
- Local chat history
- Improved formatting and inline citations

---

## 🚀 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/)
- [Ollama](https://ollama.com/) installed and running locally
- (Optional) [pnpm](https://pnpm.io) for faster install

---

### 2. Setup

```bash
# Clone the repo
git clone https://github.com/jdev422/mogo-chatbot.git
cd mogo-chatbot

# Install backend
cd backend
npm install
npm run dev
# Runs on http://localhost:3000

# Install frontend
cd ../frontend
npm install
npm run dev
# Runs on http://localhost:3007