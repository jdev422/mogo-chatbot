import React, { useEffect, useRef } from "react";
import { Message } from "ai/react";
import ChatMessage from "./chat-message";
import { ChatMessageList } from "./chat-message-list";

interface ChatListProps {
  messages: Message[];
  isLoading: boolean;
  loadingSubmit?: boolean;
}

export default function ChatList({
  messages,
  loadingSubmit,
}: ChatListProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, loadingSubmit]);

  return (
    <div className="flex w-full overflow-y-auto justify-center">
      <ChatMessageList>
        {messages.map((message, index) => (
          <ChatMessage
            key={message.id || index}
            message={message}
            isLast={index === messages.length - 1}
            loadingSubmit={loadingSubmit}
          />
        ))}
        <div ref={bottomRef} />
      </ChatMessageList>
    </div>
  );
}
