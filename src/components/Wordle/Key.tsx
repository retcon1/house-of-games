import React, { useContext } from "react";
import { GameContext } from "./utils/GameContext";

function Key({
  keyVal,
  bigKey,
  disabled,
}: {
  keyVal: string;
  bigKey: boolean;
  disabled: boolean | null;
}) {
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
    <div
      className="key"
      id={bigKey ? "big" : disabled ? "disabled" : undefined}
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
}

export default Key;
