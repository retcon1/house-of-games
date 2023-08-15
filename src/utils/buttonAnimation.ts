import { RefObject } from "react";

// type AnimationOptions = {
//   offsetY: number;
//   offsetX: number;
// };

export const applyButtonAnimation = (buttonRef: RefObject<HTMLDivElement>) => {
  if (buttonRef.current) {
    buttonRef.current.classList.add("effect-container");
  }

  // uncomment to apply ripple at cursor point
  //   const applyStyles = () => {
  //     if (buttonRef.current) {
  //       const { style } = buttonRef.current;
  //       const sizeOffset = 50;

  //       style.setProperty("--effect-top", `${offsetY - sizeOffset}px`);
  //       style.setProperty("--effect-left", `${offsetX - sizeOffset}px`);
  //     }
  //   };

  const onClick = () => {
    if (buttonRef.current) {
      buttonRef.current.classList.remove("active");
      //   applyStyles();
      void buttonRef.current.offsetWidth; // This line triggers a reflow, resetting the animation
      buttonRef.current.classList.add("active");
    }
  };

  //   applyStyles();

  if (buttonRef.current) {
    buttonRef.current.addEventListener("mouseup", onClick);
  }

  const cleanupRef = buttonRef.current;

  return () => {
    if (cleanupRef) cleanupRef.removeEventListener("mouseup", onClick);
  };
};
