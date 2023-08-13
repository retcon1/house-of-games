import { Cell } from "./Cell";

interface BoardProps {
  board: string[];
  onClick: (index: number) => void;
}

export const Board = ({ board, onClick }: BoardProps) => {
  const renderCell = (index: number) => (
    <Cell value={board[index]} onClick={() => onClick(index)} />
  );

  return (
    <div className="board">
      <>
        {renderCell(0)}
        {renderCell(1)}
        {renderCell(2)}
      </>
      <>
        {renderCell(3)}
        {renderCell(4)}
        {renderCell(5)}
      </>
      <>
        {renderCell(6)}
        {renderCell(7)}
        {renderCell(8)}
      </>
    </div>
  );
};
