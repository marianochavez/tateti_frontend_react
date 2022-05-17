import {useEffect, useState} from "react";

import calculateWinner from "../../helpers/calculateWinner";
import {Player} from "../../types";

import {Score} from "./Score";
import {Square} from "./Square";

export const Board = () => {
  const [board, setBoard] = useState(
    localStorage.getItem("board") ? JSON.parse(localStorage.getItem("board") || "{}") : {},
  );
  const [squares, setSquares] = useState(board.table);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(board.turn);
  const [winner, setWinner] = useState(board.winner);
  const [players, setPlayers] = useState(
    localStorage.getItem("players") ? JSON.parse(localStorage.getItem("players") as string) : {},
  );

  // useEffect(() => {
  //   const persistPlayers = localStorage.getItem("players");

  //   if (persistPlayers) setPlayers(JSON.parse(persistPlayers));
  // }, [setPlayers]);

  // useEffect(() => {
  //   localStorage.setItem("players", JSON.stringify(players));
  // }, [players]);

  const setSquareValue = (index: number) => {
    const newData = squares.map((value, i) => {
      if (i === index) {
        return currentPlayer;
      }

      return value;
    });

    setSquares(newData);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  // function reset() {
  //   setSquares(Array(9).fill(null));
  //   setWinner(null);
  //   setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
  // }

  // useEffect(() => {
  //   const winner = calculateWinner(squares);

  //   if (winner) {
  //     setWinner(winner);

  //     setPlayers({
  //       player1: {
  //         ...players.player1,
  //         score: winner === "X" ? players.player1.score + 1 : players.player1.score,
  //       },
  //       player2: {
  //         ...players.player2,
  //         score: winner === "O" ? players.player2.score + 1 : players.player2.score,
  //       },
  //     });
  //   }

  //   if (!winner && !squares.filter((square) => !square).length) {
  //     setWinner("BOTH");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [squares]);

  return (
    <div className="container main-cointainer">
      <div>
        <p className="nes-balloon from-right nes-pointer">
          {!winner && `${currentPlayer},es tu turno!`}
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
                  onClick={() => setSquareValue(index)}
                />
              );
            })}
        </div>
        {/* <div className="container">
          <button className="nes-btn is-warning" onClick={reset}>
            Reset
          </button>
        </div> */}
      </div>

      {/* <Score
        players={players}
        onClick={() =>
          setPlayers({
            player1: {
              ...players.player1,
              score: 0,
            },
            player2: {
              ...players.player2,
              score: 0,
            },
          })
        }
      /> */}
    </div>
  );
};
