import { Request, Response } from "express";
import { generateChatResponse } from "../services/chatService";

export const handleChat = async (req: Request, res: Response) => {
  const { messages } = req.body;

  try {
    const result = await generateChatResponse(messages);
    result.pipeTextStreamToResponse(res);
  } catch (error) {
    console.error("Error streaming chat response:", error);
    res.status(500).json({ error: "Failed to stream chat response" });
  }
};