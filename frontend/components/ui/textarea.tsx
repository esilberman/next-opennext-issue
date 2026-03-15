import { forwardRef, TextareaHTMLAttributes, useState, useRef, useCallback, useEffect, ChangeEvent, RefObject } from "react";

import { cn } from "@/lib/utils";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, onChange, ...props }, forwardedRef) => {
  const [textareaHeight, setTextareaHeight] = useState('80px');
  const internalRef = useRef<HTMLTextAreaElement>(null);

  const ref = useCallback((node: HTMLTextAreaElement) => {
    internalRef.current = node;
    if (typeof forwardedRef === 'function') {
      forwardedRef(node);
    } else if (forwardedRef) {
      (forwardedRef as RefObject<HTMLTextAreaElement>).current = node;
    }
  }, [forwardedRef]);

  const adjustHeight = useCallback(() => {
    const textarea = internalRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.max(80, textarea.scrollHeight);
      setTextareaHeight(`${newHeight}px`);
    }
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [props.value, adjustHeight]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    adjustHeight();
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <textarea
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base transition-[color] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      style={{ height: textareaHeight }}
      onChange={handleChange}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };