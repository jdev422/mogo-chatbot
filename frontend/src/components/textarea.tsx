import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={
          "border-input focus-visible:ring-ring py-3 min-h-16 disabled:opacity-50 w-full flex items-center h-16 max-h-40 px-6 pt-6 border-0 shadow-none bg-accent rounded-lg text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed bg-[#181818] overflow-hidden"
        }
        ref={ref}
        name="message"
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
