export const calculateWinner = (board: string[]): string | null => {
  // Logic to check for a winner
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of winPatterns) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.every((element) => element)) {
    return "Draw!";
  }
  return null;
};

export const aiMove = (board: string[]) => {
  const availableMoves = [];

  // Check all free spaces
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      availableMoves.push(i);
    }
  }

  let bestScore = -Infinity;
  let bestMove = -1;

  for (const move of availableMoves) {
    const newBoard = [...board];
    newBoard[move] = "O";

    const score = minimax(newBoard, 0, false);

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }
  console.log(bestMove, bestScore);
  return bestMove;
};

const minimax = (
  board: string[],
  depth: number,
  isMaximizing: boolean
): number => {
  const winner = calculateWinner(board);

  if (winner === "O") {
    return 1;
  }
  if (winner === "X") {
    return -1;
  }
  if (winner === "Draw!") {
    return 0;
  }

  if (isMaximizing) {
    let maxScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        const newBoard = [...board];
        newBoard[i] = "O";
        const score = minimax(newBoard, depth + 1, false);
        maxScore = Math.max(maxScore, score);
      }
    }
    return maxScore;
  } else {
    let minScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        const newBoard = [...board];
        newBoard[i] = "X";
        const score = minimax(newBoard, depth + 1, true);
        minScore = Math.min(minScore, score);
      }
    }
    return minScore;
  }
};
