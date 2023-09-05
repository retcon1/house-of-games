import React, { useContext } from "react";
import { GameContext } from "./Game";

function Key({ keyVal, bigKey }: { keyVal: string; bigKey: boolean }) {
  const { onSelectLetter, onDelete, onEnter } = useContext(GameContext);

  const selectLetter = () => {
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };

  return (
    <div className="key" id={bigKey ? "big" : undefined} onClick={selectLetter}>
      {keyVal}
    </div>
  );
}

export default Key;
