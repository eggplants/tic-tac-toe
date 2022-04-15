import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// game grid
type SquareValue = "X" | "O" | null;
type SquareProps = { value: SquareValue; onClick: () => void };
const Square = (props: SquareProps) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

// check if game is already over and winner is "X" or "O"
const calculateWinner = (squares: Array<SquareValue>) => {
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

// game board
class Board extends React.Component<
  { squares: Array<SquareValue>; onClick: (i: number) => void },
  {}
> {
  renderSquare(i: number) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// main app
type GameState = {
  history: Array<{ squares: Array<SquareValue> }>;
  xIsNext: boolean;
  stepNumber: number;
};
class Game extends React.Component<{}, GameState> {
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

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
