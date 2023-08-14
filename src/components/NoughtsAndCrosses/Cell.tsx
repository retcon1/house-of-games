interface CellProps {
  value: string | null;
  onClick: () => void;
}

export const Cell = ({ value, onClick }: CellProps) => {
  return (
    <div className="cell" onClick={onClick}>
      {value}
    </div>
  );
};