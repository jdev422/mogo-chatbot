"use client";
import React, { createContext, useContext } from "react";
import { useChatHistory } from "./useChatHistory";

const ChatHistoryContext = createContext<ReturnType<typeof useChatHistory> | null>(null);

export const ChatHistoryProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useChatHistory();
  return (
    <ChatHistoryContext.Provider value={value}>
      {children}
    </ChatHistoryContext.Provider>
  );
};

export const useChatHistoryContext = () => {
  const ctx = useContext(ChatHistoryContext);
  if (!ctx) {
    throw new Error("useChatHistoryContext must be used inside ChatHistoryProvider");
  }
  return ctx;
};
