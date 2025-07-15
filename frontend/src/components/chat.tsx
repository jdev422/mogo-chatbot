"use client";
import { useChat } from "@ai-sdk/react";
import ChatBottombar from "./chat-bottombar";
import ChatList from "./chat-list";
import { useChatHistory } from "@/hooks/useChatHistory";
import { useCallback, useEffect } from "react";
import { Message } from "ai/react";
import { useChatHistoryContext } from "@/hooks/ChatHistoryProvider";

interface ChatProps {
  initialMessages: Message[];
  currentSession: ReturnType<typeof useChatHistory>["currentSession"];
}

export default function Chat({ initialMessages, currentSession }: ChatProps) {
  const { updateSessionMessages } = useChatHistoryContext();

  const saveChatSession = useCallback(
    (finalMessages: Message[]) => {
      if (currentSession?.id && finalMessages.length > 0) {
        console.log(
          "------Calling updateSessionMessages from saveChatSession-----",
          currentSession.id,
          finalMessages
        );
        updateSessionMessages(currentSession.id, finalMessages);
      }
    },
    [currentSession?.id, updateSessionMessages]
  );

  const { messages, input, setInput, handleInputChange, handleSubmit, stop } =
    useChat({
      api: "http://localhost:3000/api/chat",
      streamProtocol: "text",
      initialMessages: initialMessages,
      onFinish: () => {
        saveChatSession(messages);
      },
    });

  useEffect(() => {
    setInput("");
  }, [initialMessages, setInput]);

  return (
    <div className="flex flex-col w-full h-full">
      {messages.length === 0 &&
      (!currentSession || currentSession.messages.length === 0) ? (
        <div className="flex flex-col h-full w-full items-center gap-4 justify-center">
          <p className="text-center text-base text-muted-foreground">
            How can I help you today?
          </p>
          <ChatBottombar
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            stop={stop}
            setInput={setInput}
          />
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto px-4 py-2">
            <ChatList messages={messages} isLoading={false} />
          </div>
          <div className="flex justify-center px-4 py-2">
            <ChatBottombar
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              stop={stop}
              setInput={setInput}
            />
          </div>
        </div>
      )}
    </div>
  );
}
