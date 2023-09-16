import React, { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  ref: () => void | null;
}

const FancyButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ text, ...props }, ref) => (
    <button {...props} ref={ref}>
      {text}
    </button>
  )
);

FancyButton.displayName = "Button";

export default FancyButton;