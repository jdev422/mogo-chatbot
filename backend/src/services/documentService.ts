import * as fs from "node:fs/promises";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OllamaEmbeddings } from "@langchain/ollama";
import { Document } from "@langchain/core/documents";

const ollamaEmbeddings = new OllamaEmbeddings({
  model: "llama3",
});

let vectorStoreInstance: MemoryVectorStore | null = null;

export async function initializeVectorStore(documentPath: string) {
  if (vectorStoreInstance) {
    console.log("Vector store already initialized.");
    return vectorStoreInstance;
  }

  try {
    const rawText = await fs.readFile(documentPath, "utf-8");

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500, 
      chunkOverlap: 50,
    });
    const docs = await textSplitter.createDocuments([rawText]);
    vectorStoreInstance = await MemoryVectorStore.fromDocuments(docs, ollamaEmbeddings);
    return vectorStoreInstance;
  } catch (error) {
    console.error("Error initializing vector store:", error);
    throw new Error("Failed to initialize vector store with document");
  }
}

export async function retrieveRelevantContext(query: string): Promise<string> {
  if (!vectorStoreInstance) {
    console.warn("Vector store not initialized. Cannot retrieve context.");
    return "";
  }

  try {
    const relevantDocs = await vectorStoreInstance.similaritySearch(query, 4);
    return relevantDocs.map((doc: Document) => doc.pageContent).join("\n\n");
  } catch (error) {
    console.error("Error retrieving context from vector store:", error);
    return "";
  }
}
