import {useEffect, useState} from "react";

import calculateWinner from "../helpers/calculateWinner";
import {Player} from "../types";

import {Score} from "./Score";
import {Square} from "./Square";

interface PlayerScore {
  name: string;
  score: number;
}

export interface Players {
  player1: PlayerScore;
  player2: PlayerScore;
}

export const Board = () => {
  const [squares, setSquares] = useState<Array<Player>>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
    Math.round(Math.random() * 1) === 1 ? "X" : "O",
  );
  const [winner, setWinner] = useState<Player>(null);
  const [players, setPlayers] = useState<Players>(
    localStorage.getItem("players")
      ? JSON.parse(localStorage.getItem("players") as string)
      : {
          player1: {name: "Jugador X", score: 0},
          player2: {name: "Jugador O", score: 0},
        },
  );

  useEffect(() => {
    const persistPlayers = localStorage.getItem("players");

    if (persistPlayers) setPlayers(JSON.parse(persistPlayers));
  }, [setPlayers]);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

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

  function reset() {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
  }

  useEffect(() => {
    const winner = calculateWinner(squares);

    if (winner) {
      setWinner(winner);

      setPlayers({
        player1: {
          ...players.player1,
          score: winner === "X" ? players.player1.score + 1 : players.player1.score,
        },
        player2: {
          ...players.player2,
          score: winner === "O" ? players.player2.score + 1 : players.player2.score,
        },
      });
    }

    if (!winner && !squares.filter((square) => !square).length) {
      setWinner("BOTH");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squares]);

  return (
    <div className="container main-cointainer">
      <div>
        <p className="nes-balloon from-right nes-pointer">
          {!winner && `${currentPlayer},es tu turno!`}
          {winner && winner !== "BOTH" && `Ganaste ${winner}!`}
          {winner && winner === "BOTH" && "Empate!"}
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
        <div className="container">
          <button className="nes-btn is-warning" onClick={reset}>
            Reset
          </button>
        </div>
      </div>

      <Score
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
      />
    </div>
  );
};
