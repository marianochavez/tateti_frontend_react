import {createContext, useEffect, useState} from "react";

import {createBoard, historical, joinGame, leave, play} from "../../helpers/boardApi";

import {Players} from "./UserProvider";

interface Board {
  id: number;
  table: (string | null)[];
  state: string;
  winner: string | null;
  turn: string;
}

interface BoardContext {
  board: Board;
  isBoardCreated: boolean;
  isBoardJoined: boolean;
  squares: (string | null)[];
  currentPlayer: string | null;
  winner: string | null;
  playIn: (index: number, players: Players) => void;
  clearBoard: () => void;
  checkWinner: () => void;
  getHistorical: (id1: number, id2: number) => Promise<any>;
  leaveBoard: (token: string) => Promise<any>;
  userCreateBoard: (token: string) => Promise<any>;
  userJoinGame: (id: number, token: string) => Promise<any>;
}

interface Props {
  children: React.ReactNode;
}

export const BoardContext = createContext<BoardContext>({
  board: {
    id: 0,
    table: [],
    state: "",
    winner: null,
    turn: "",
  },
  isBoardCreated: false,
  isBoardJoined: false,
  squares: [],
  currentPlayer: null,
  winner: null,
  clearBoard: () => {},
  playIn: () => {},
  checkWinner: () => {},
  getHistorical: () => Promise.resolve(),
  leaveBoard: () => Promise.resolve(),
  userCreateBoard: () => Promise.resolve(),
  userJoinGame: () => Promise.resolve(),
});

export const BoardProvider = ({children}: Props) => {
  const [board, setBoard] = useState<Board>(JSON.parse(localStorage.getItem("board") || "{}"));
  const [isBoardCreated, setIsBoardCreated] = useState<boolean>(board.id ? true : false);
  const [isBoardJoined, setIsBoardJoined] = useState<boolean>(
    board.state !== "Qeue" ? true : false,
  );
  const [squares, setSquares] = useState<(string | null)[]>(board.table || []);
  const [currentPlayer, setCurrentPlayer] = useState<string | null>(board.turn || null);
  const [winner, setWinner] = useState<string | null>(board.winner || null);

  useEffect(() => {
    const boardData = JSON.parse(localStorage.getItem("board") || "{}");

    if (boardData) setBoard(boardData);
  }, []);

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
  }, [board]);

  const userCreateBoard = async (token: string) => {
    if (isBoardCreated) return;

    const board = await createBoard(token);

    if (board) {
      setBoard(board.data);
      setIsBoardCreated(true);
      setCurrentPlayer(board.data.turn);

      return board;
    } else {
      return false;
    }
  };

  const userJoinGame = async (id: number, token: string) => {
    if (isBoardJoined) return;

    const res = await joinGame(id, token);

    if (res) {
      setBoard(res.data);
      setIsBoardJoined(true);

      return res;
    } else {
      return false;
    }
  };

  const playIn = async (index: number, players: Players) => {
    const playerTurn =
      currentPlayer === "X"
        ? players[parseInt(Object.keys(players)[0])]
        : players[parseInt(Object.keys(players)[1])];

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

  const checkWinner = () => {
    if (board.winner) setWinner(board.winner);
  };

  const clearBoard = () => {
    setBoard({
      id: 0,
      table: [],
      state: "",
      winner: null,
      turn: "",
    });
    setIsBoardCreated(false);
    setIsBoardJoined(false);
    setSquares([]);
    setCurrentPlayer(null);
    setWinner(null);
  };

  const getHistorical = async (id1: number, id2: number) => {
    const historicalBoards = await historical(id1, id2);

    if (historicalBoards) {
      return historicalBoards;
    }

    return [];
  };

  const leaveBoard = async (token: string) => {
    if (board.id) {
      await leave(board.id, token);
    } else {
      // eslint-disable-next-line no-console
      console.log("No board to leave");
    }
  };

  return (
    <BoardContext.Provider
      value={{
        board,
        isBoardCreated,
        isBoardJoined,
        currentPlayer,
        winner,
        squares,
        playIn,
        clearBoard,
        checkWinner,
        getHistorical,
        leaveBoard,
        userCreateBoard,
        userJoinGame,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
