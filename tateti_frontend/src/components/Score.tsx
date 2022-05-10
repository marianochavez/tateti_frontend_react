import {Players} from "./Board";

interface Props {
  players: Players;
  onClick: () => void;
}

export const Score = ({players, onClick}: Props) => {
  const {player1, player2} = players;

  return (
    <div className="container">
      <h4>
        <i className="nes-icon trophy is-s" />
        Puntuaciones
        <i className="nes-icon trophy" />
      </h4>
      <div className="nes-table-responsive">
        <table className="nes-table is-bordered is-centered ">
          <thead>
            <tr>
              <th>{player1.name}</th>
              <th>{player2.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{player1.score}</td>
              <td>{player2.score}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="nes-btn is-error" onClick={onClick}>
        Clean scores
      </button>
    </div>
  );
};
