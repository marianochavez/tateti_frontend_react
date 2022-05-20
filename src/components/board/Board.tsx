import {useContext, useEffect} from "react";
import {Navigate, useNavigate} from "react-router-dom";

import {BoardContext} from "../providers/BoardProvider";
import {UserContext} from "../providers/UserProvider";

import {Square} from "./Square";

export const Board = () => {
  const navigate = useNavigate();
  const {
    squares,
    currentPlayer,
    winner,
    isBoardCreated,
    isBoardJoined,
    playIn,
    clearBoard,
    checkWinner,
  } = useContext(BoardContext);
  const {players} = useContext(UserContext);

  useEffect(() => {
    checkWinner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squares]);

  const handlePlay = (index: number) => {
    playIn(index, players);
  };

  const handleReset = () => {
    clearBoard();
    navigate("/");
  };

  if (!isBoardCreated || !isBoardJoined) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="container main-cointainer">
      <div>
        <p className="nes-balloon from-right nes-pointer">
          {!winner &&
            `${
              currentPlayer === "X"
                ? players[parseInt(Object.keys(players)[0])].name
                : players[parseInt(Object.keys(players)[1])].name
            },es tu turno!`}
          {winner && winner !== "Draw" && `Ganaste ${winner}!`}
          {winner && winner === "Draw" && "Empate!"}
        </p>

        <div className="grid">
          {Array(9)
            .fill(null)
            .map((_, index) => {
              return (
                <Square
                  key={index}
                  value={squares[index]}
                  winner={winner}
                  onClick={() => handlePlay(index)}
                />
              );
            })}
        </div>
        <div className="container">
          {winner && (
            <button className="nes-btn is-warning" onClick={handleReset}>
              Volver a jugar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
