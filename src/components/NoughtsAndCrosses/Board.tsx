import { Cell } from "./Cell";

interface BoardProps {
  board: string[];
  onClick: (index: number) => void;
}

export const Board = ({ board, onClick }: BoardProps) => {
  const cells = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="board">
      {cells.map((cell) => (
        <Cell key={cell} value={board[cell]} onClick={() => onClick(cell)} />
      ))}
    </div>
  );
};
