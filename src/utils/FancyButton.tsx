import React, { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  ref: () => void | null;
}

const FancyButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ text, className, ...props }, ref) => (
    <div className="fancy-btn-container">
      <button {...props} ref={ref} className={`fancy-btn ${className}`}>
        {text}
      </button>
    </div>
  )
);

FancyButton.displayName = "Button";

export default FancyButton;
