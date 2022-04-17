import { useState } from "react";
import { calculateWinner } from "../lib/checkWinner";
import { Board } from "./Board";

export const Game = () => {
  // constructor
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  // method
  const handleClick = (i: number) => {
    const _history = history.slice(0, stepNumber + 1);
    const current = _history[_history.length - 1];
    const squares = current.squares.slice();
    // return if clicked square is already filled or game is already over
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = xIsNext ? "X" : "O";
    setHistory(history.concat([{ squares: squares }]));
    setXIsNext(!xIsNext);
    setStepNumber(history.length);
  };

  const jumpTo = (move: number) => {
    setXIsNext(move % 2 === 0);
    setStepNumber(move);
  };

  // render
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  // create moves as li
  // Array.map((elm, idx) => {...})
  const moves = history.map((_, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  const status = winner
    ? `Winner: ${winner}`
    : stepNumber === 9
    ? `Draw!`
    : `Next player: ${xIsNext ? "X" : "O"}`;
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};
