import * as React from "react";
import { Textarea } from "./textarea";

interface ChatInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ className, ...props }, forwardedRef) => {
    const handleRef = (node: HTMLTextAreaElement | null) => {
      if (node) {
        node.style.height = "0px";
        node.style.height = node.scrollHeight + "px";
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      }
    };

    return (
      <Textarea
        autoComplete="off"
        ref={handleRef}
        name="message"
        className={"px-4 py-3 min-h-16 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-md flex items-center h-16"}
        {...props}
      />
    );
  }
);

ChatInput.displayName = "ChatInput";

export { ChatInput };
