import React from "react";
import "./index.css";
import { calculateWinner } from "../lib/checkWinner";
import { Board } from "./Board";
import { SquareValue } from "./Square";
// main app
type GameState = {
  history: Array<{ squares: Array<SquareValue> }>;
  xIsNext: boolean;
  stepNumber: number;
};
export class Game extends React.Component<{}, GameState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true,
      stepNumber: 0,
    };
  }
  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    // return if clicked square is already filled or game is already over
    if (calculateWinner(squares) || squares[i]) return;
    const xIsNext = this.state.xIsNext;
    squares[i] = xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares: squares }]),
      xIsNext: !xIsNext,
      stepNumber: history.length,
    });
  }
  jumpTo(move: number) {
    this.setState({ xIsNext: move % 2 === 0, stepNumber: move });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // create moves as li
    // Array.map((elm, idx) => {...})
    const moves = history.map((_, move) => {
      const desc = move ? `Go to move #${move}` : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    const status = winner
      ? `Winner: ${winner}`
      : this.state.stepNumber === 9
      ? `Draw!`
      : `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
