"use client";

import { Sidebar } from "./sidebar";
import Chat from "./chat";
import { Message } from "ai/react";
import { useChatHistory } from "@/hooks/useChatHistory"; // Import useChatHistory to access types

interface ChatLayoutProps {
  id: string;
  initialMessages: Message[];
  currentSession: ReturnType<typeof useChatHistory>["currentSession"];
}

export default function ChatLayout({
  id,
  initialMessages,
  currentSession,
}: ChatLayoutProps) {
  return (
    <div className="h-full w-full flex">
      <Sidebar />
      <div className="w-full flex justify-center">
        <Chat
          key={id}
          initialMessages={initialMessages}
          currentSession={currentSession}
        />
      </div>
    </div>
  );
}
