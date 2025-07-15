
import { streamText, convertToCoreMessages } from "ai";
import { createOllama } from "ollama-ai-provider";
import { retrieveRelevantContext } from "./documentService";

const ollama = createOllama();

export const generateChatResponse = async (messages: any[]) => {
  const lastUserMessage = messages[messages.length - 1]?.content || "";

  const context = await retrieveRelevantContext(lastUserMessage);

  const messagesWithContext = convertToCoreMessages([
    { role: "system", content: "You are a helpful assistant. Use the following context to answer the user's question. If the context does not contain the answer, state that you don't have enough information from the provided document but try to answer based on your general knowledge if possible." },
    { role: "system", content: `Context: ${context}` },
    ...messages,
  ]);

  const result = await streamText({
    model: ollama("llama3"), 
    messages: messagesWithContext, 
  });

  return result; 
};
