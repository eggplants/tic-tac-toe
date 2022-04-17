// game grid
export type SquareValue = "X" | "O" | null;
type SquareProps = { value: SquareValue; onClick: () => void };
export const Square = (props: SquareProps) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};
