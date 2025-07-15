import * as React from "react";

interface ChatMessageListProps extends React.HTMLAttributes<HTMLDivElement> {
  smooth?: boolean;
}

const ChatMessageList = React.forwardRef<HTMLDivElement, ChatMessageListProps>(
  ({ className, children, smooth = false, ...props }, _ref) => {
    return (
      <div className="relative max-w-3xl h-full">
        <div
          className={`flex flex-col w-full h-full p-6 overflow-y-auto ${className}`}
          {...props}
        >
          <div className="flex flex-col gap-6">{children}</div>
        </div>
      </div>
    );
  }
);

ChatMessageList.displayName = "ChatMessageList";

export { ChatMessageList };
