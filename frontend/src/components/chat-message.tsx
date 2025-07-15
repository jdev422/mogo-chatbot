import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import Markdown from "react-markdown";
import { Message } from "ai/react";
import { ChatBubble, ChatBubbleMessage } from "./chat-bubble";

export type ChatMessageProps = {
  message: Message;
  isLast: boolean;
  loadingSubmit: boolean | undefined;
};

function ChatMessage({ message, isLast, loadingSubmit }: ChatMessageProps) {
  const { thinkContent, cleanContent } = useMemo(() => {
    const getThinkContent = (content: string) => {
      const match = content.match(/<think>([\s\S]*?)(?:<\/think>|$)/);
      return match ? match[1].trim() : null;
    };

    return {
      thinkContent:
        message.role === "assistant" ? getThinkContent(message.content) : null,
      cleanContent: message.content
        .replace(/<think>[\s\S]*?(?:<\/think>|$)/g, "")
        .trim(),
    };
  }, [message.content, message.role]);

  const contentParts = useMemo(() => cleanContent.split("```"), [cleanContent]);

  const renderContent = () =>
    contentParts.map((part, index) => <Markdown key={index}>{part}</Markdown>);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 1, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1, y: 20 }}
        transition={{
          opacity: { duration: 0.1 },
          layout: {
            type: "spring",
            bounce: 0.3,
            duration: 0.2,
          },
        }}
        className="flex flex-col gap-2 whitespace-pre-wrap"
      >
        <ChatBubble variant={message.role === "user" ? "sent" : "received"}>
          <ChatBubbleMessage>{renderContent()}</ChatBubbleMessage>
        </ChatBubble>
      </motion.div>

      {isLast && loadingSubmit && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex px-4 py-2 animate-pulse"
        >
          <div className="flex gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-muted" />
            <span className="w-2.5 h-2.5 rounded-full bg-muted" />
            <span className="w-2.5 h-2.5 rounded-full bg-muted" />
          </div>
        </motion.div>
      )}
    </>
  );
}

export default memo(ChatMessage, (prevProps, nextProps) => {
  return (
    prevProps.message === nextProps.message &&
    prevProps.isLast === nextProps.isLast &&
    prevProps.loadingSubmit === nextProps.loadingSubmit
  );
});
