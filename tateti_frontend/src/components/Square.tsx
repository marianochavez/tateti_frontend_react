import {Player} from "../types";

interface Props {
  value: Player;
  winner: Player;
  onClick: () => void;
}

export const Square = ({value, onClick, winner}: Props): JSX.Element => {
  if (!value) {
    return (
      <button
        className={`nes-btn nes-btn-square square ${Boolean(winner) ? "is-disabled" : ""}`}
        disabled={Boolean(winner)}
        onClick={onClick}
      >
        &nbsp;
      </button>
    );
  }

  return (
    <button
      disabled
      className={`nes-btn nes-btn-square square square_${value.toLocaleLowerCase()}`}
    >
      {value}
    </button>
  );
};
