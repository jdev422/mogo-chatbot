import React from "react";
import { AnimatePresence } from "framer-motion";
import { ChatInput } from "./chat-input";
import { ChatRequestOptions } from "ai";

const isListening = false;

interface ChatBottombarProps {
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  stop: () => void;
  setInput?: React.Dispatch<React.SetStateAction<string>>;
  input: string;
}

export default function ChatBottombar({
  input,
  handleInputChange,
  handleSubmit,
  stop,
  setInput,
}: ChatBottombarProps) {
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };
  return (
    <div className="px-4 pb-7 flex justify-between w-full items-center relative max-w-3xl">
      <AnimatePresence initial={false}>
        <form
          onSubmit={handleSubmit}
          className="w-full items-center flex flex-col  bg-accent rounded-lg "
        >
          <ChatInput
            value={isListening ? input : input}
            ref={inputRef}
            placeholder={!isListening ? "Enter your prompt here" : "Listening"}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            name="message"
            className="max-h-40 px-6 pt-6 border-0 shadow-none bg-accent rounded-lg text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed dark:bg-card"
          />
        </form>
      </AnimatePresence>
    </div>
  );
}
