import { useState } from "react";

export const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [sum, setSum] = useState<Array<number | string>>([]);
  const [result, setResult] = useState<string | null>(null);

  const isSymbol = (char: string): boolean => {
    return ["+", "-", "*", "/"].includes(char);
  };

  const zeroChecker = (str: string) => {
    if (/^\b0[0-9]*\b$/.test(str)) return true;
    else return false;
  };

  const btnClick = (input: number): void => {
    // resets equation if user presses number after seeing result
    if (result) {
      setResult(null);
      setDisplay(input.toString());
      return;
    }
    setSum([...sum, input]);
    setDisplay(display + input);
  };

  const symbolClick = (input: string) => {
    const lastChar = display.charAt(display.length - 1);
    // prevents user from using multiple symbols in a row
    if (isSymbol(lastChar)) {
      return;
    }
    // continues equation if a symbol is pressed after user sees result
    if (result) {
      setDisplay(result + input);
      setSum([result]);
      setResult(null);
    } else {
      setSum([...sum, input]);
      setDisplay(display + input);
    }
  };

  const resultClick = () => {
    const lastChar = display.charAt(display.length - 1);
    if (isSymbol(lastChar)) {
      return;
    }
    const formattedSum = sum.map((e) => {
      if (typeof e === "number") {
        return parseInt(e.toString());
      } else return e;
    });
    console.log(formattedSum);
    setResult(eval(display));
  };

  const clearClick = () => {
    setSum([]);
    setResult(null);
    setDisplay("");
  };

  return (
    <div className="calculator">
      <div className="display">
        <h6 style={{ wordWrap: "break-word" }}>
          {result ? result : display ? display : 0}
        </h6>
      </div>
      <div className="calc-container">
        <button className="num-btn" onClick={(e) => btnClick(1)}>
          1
        </button>
        <button className="num-btn" onClick={(e) => btnClick(2)}>
          2
        </button>
        <button className="num-btn" onClick={(e) => btnClick(3)}>
          3
        </button>
        <button className="num-btn" onClick={(e) => symbolClick("/")}>
          ÷
        </button>
        <button className="num-btn" onClick={(e) => btnClick(4)}>
          4
        </button>
        <button className="num-btn" onClick={(e) => btnClick(5)}>
          5
        </button>
        <button className="num-btn" onClick={(e) => btnClick(6)}>
          6
        </button>
        <button className="num-btn" onClick={(e) => symbolClick("*")}>
          X
        </button>
        <button className="num-btn" onClick={(e) => btnClick(7)}>
          7
        </button>
        <button className="num-btn" onClick={(e) => btnClick(8)}>
          8
        </button>
        <button className="num-btn" onClick={(e) => btnClick(9)}>
          9
        </button>
        <button className="num-btn" onClick={(e) => symbolClick("-")}>
          -
        </button>
        <button className="num-btn zero" onClick={(e) => btnClick(0)}>
          0
        </button>
        <button className="num-btn" onClick={(e) => symbolClick(".")}>
          .
        </button>
        <button className="num-btn" onClick={(e) => symbolClick("+")}>
          +
        </button>
        <button className="num-btn equals" onClick={(e) => resultClick()}>
          =
        </button>
        <button className="num-btn cancel" onClick={(e) => clearClick()}>
          C
        </button>
      </div>
    </div>
  );
};
