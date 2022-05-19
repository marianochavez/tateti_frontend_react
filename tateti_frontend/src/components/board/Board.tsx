import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {play} from "../../helpers/boardApi";

import {Square} from "./Square";

export const Board = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState(
    localStorage.getItem("board")
      ? JSON.parse(localStorage.getItem("board") || "{}")
      : navigate("/"),
  );
  const players = localStorage.getItem("players")
    ? JSON.parse(localStorage.getItem("players") as string)
    : navigate("/login");
  const [squares, setSquares] = useState(board.table);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(board.turn);
  const [winner, setWinner] = useState(board.winner);

  useEffect(() => {
    const persistBoard = localStorage.getItem("board");

    if (persistBoard) setBoard(JSON.parse(persistBoard));
  }, [setBoard]);

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
  }, [board]);

  const setSquareValue = async (index: number) => {
    const playerTurn =
      currentPlayer === "X" ? players[Object.keys(players)[0]] : players[Object.keys(players)[1]];

    const playerPlay = await play(board.id, playerTurn.token, index);

    if (playerPlay.board) {
      setBoard(playerPlay.board);
      setSquares(playerPlay.board.table);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    } else {
      // eslint-disable-next-line no-console
      console.log(playerPlay);
    }
  };

  useEffect(() => {
    if (board.winner) setWinner(board.winner);
    if (board.state === "Draw") setWinner("Draw");
  }, [board]);

  const handleReset = () => {
    localStorage.removeItem("board");
    navigate("/");
  };

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
        <div className="container">
          {winner && (
            <button className="nes-btn is-warning" onClick={handleReset}>
              Volver a jugar
            </button>
          )}
        </div>
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
