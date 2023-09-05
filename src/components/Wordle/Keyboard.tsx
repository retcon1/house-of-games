import React, { useCallback, useContext, useEffect } from "react";
import Key from "./Key";
import { GameContext } from "./Game";

function Keyboard() {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const { onEnter, onDelete, onSelectLetter } = useContext(GameContext);

  const handleKeyboard = useCallback(
    (event: any) => {
      if (event.key === "Enter") {
        onEnter();
      } else if (event.key === "Backspace") {
        onDelete();
      } else {
        keys1.forEach((key) => {
          if (event.key.toUpperCase() === key) {
            onSelectLetter(key);
          }
        });

        keys2.forEach((key) => {
          if (event.key.toUpperCase() === key) {
            onSelectLetter(key);
          }
        });

        keys3.forEach((key) => {
          if (event.key.toUpperCase() === key) {
            onSelectLetter(key);
          }
        });
      }
    },
    [onEnter, onDelete, onSelectLetter]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">
        {keys1.map((key) => (
          <Key keyVal={key} bigKey={false} key={key} />
        ))}
      </div>
      <div className="line2">
        {keys2.map((key) => (
          <Key keyVal={key} bigKey={false} key={key} />
        ))}
      </div>
      <div className="line3">
        <Key keyVal={"ENTER"} bigKey />
        {keys3.map((key) => (
          <Key keyVal={key} bigKey={false} key={key} />
        ))}
        <Key keyVal={"DELETE"} bigKey />
      </div>
    </div>
  );
}

export default Keyboard;
