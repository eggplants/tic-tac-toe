import { SquareValue } from "./../components/Square";

// check if game is already over and winner is "X" or "O"
export const calculateWinner = (squares: Array<SquareValue>) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // returns "X" or "O"
    }
  }
  return null; // draw or continue
};
