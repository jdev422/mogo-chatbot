import * as React from "react";

type ChatBubbleVariant = "received" | "sent";
type ChatBubbleLayout = "default" | "ai";

interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ChatBubbleVariant;
  layout?: ChatBubbleLayout;
}

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  (
    {
      className = "",
      variant = "received",
      layout = "default",
      children,
      ...props
    },
    ref
  ) => {
    let bubbleClass = "flex gap-2 max-w-[80%] items-end relative group";

    if (variant === "sent") {
      bubbleClass += "flex gap-2 max-w-[80%] items-end relative self-end flex-row-reverse bg-[#323232] text-white rounded-2xl px-4 py-2";
    } else {
      bubbleClass += " self-start";
    }

    if (layout === "ai") {
      bubbleClass += " max-w-full w-full items-center";
    }

    if (className) {
      bubbleClass += " " + className;
    }

    return (
      <div ref={ref} className={bubbleClass} {...props}>
        {React.Children.map(children, (child) =>
          React.isValidElement(child) && typeof child.type !== "string"
            ? React.cloneElement(child, {
                variant,
                layout,
              } as React.ComponentProps<typeof child.type>)
            : child
        )}
      </div>
    );
  }
);
ChatBubble.displayName = "ChatBubble";

interface ChatBubbleMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean;
  variant?: ChatBubbleVariant;
  layout?: ChatBubbleLayout;
}

const ChatBubbleMessage = React.forwardRef<
  HTMLDivElement,
  ChatBubbleMessageProps
>(({ className = "", isLoading = false, children, ...props }, ref) => {
  let messageClass = "break-words max-w-full whitespace-pre-wrap";
  if (className) {
    messageClass += " " + className;
  }

  return (
    <div ref={ref} className={messageClass} {...props}>
      {isLoading ? (
        <div className="flex items-center space-x-2">MessageLoading</div>
      ) : (
        children
      )}
    </div>
  );
});
ChatBubbleMessage.displayName = "ChatBubbleMessage";

export { ChatBubble, ChatBubbleMessage };
