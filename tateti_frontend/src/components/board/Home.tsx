import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

import {Navbar} from "../ui/Navbar";
import {createBoard, joinGame} from "../../helpers/boardApi";

export const Home = () => {
  const players = JSON.parse(localStorage.getItem("players") || "{}");
  const board = JSON.parse(localStorage.getItem("board") || "{}");
  const [isLogged, setIsLogged] = useState(false);
  const [isLogged2, setIsLogged2] = useState(false);
  const [isBoardCreated, setIsBoardCreated] = useState(
    localStorage.getItem("board") ? true : false,
  );
  const [isBoardJoined, setIsBoardJoined] = useState(board.state === "Playing" ? true : false);

  const navigate = useNavigate();

  useEffect(() => {
    if (players[Object.keys(players)[0]]) setIsLogged(true);
    if (players[Object.keys(players)[1]]) setIsLogged2(true);
  }, [isLogged, isLogged2, players]);

  const handleCreateBoard = async () => {
    // create a new board
    const response = await createBoard(players[Object.keys(players)[0]].token);

    if (response) {
      setIsBoardCreated(true);
      localStorage.setItem("board", JSON.stringify(response.data));
      // player 2 join the board
      const boardWithTwoPl = await joinGame(
        response.data.id,
        players[Object.keys(players)[1]].token,
      );

      if (boardWithTwoPl.data.state === "Playing") {
        localStorage.setItem("board", JSON.stringify(boardWithTwoPl.data));
        setIsBoardJoined(true);
        // redirect to the board
        navigate("/game");
      }
    }
  };

  const handleJoinBoard = async () => {
    // in case the player 2 cant join the board on created board
    const boardWithTwoPl = await joinGame(board.id, players[Object.keys(players)[1]].token);

    if (boardWithTwoPl.data.state === "Playing") {
      localStorage.setItem("board", JSON.stringify(boardWithTwoPl.data));
      setIsBoardJoined(true);
      // redirect to the board
      navigate("/game");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        {isLogged && isLogged2 && !isBoardCreated && (
          <button className="nes-btn is-success" onClick={handleCreateBoard}>
            Crear juego
          </button>
        )}
        {isLogged && !isLogged2 && (
          <Link className="nes-btn is-warning" to="/login">
            Ingresar otro jugador
          </Link>
        )}
        {!isLogged && !isLogged2 && (
          <Link className="nes-btn is-warning" to="/login">
            Ingresar
          </Link>
        )}
        {isBoardCreated && !isBoardJoined && (
          <button className="nes-btn is-warning" onClick={handleJoinBoard}>
            Unirse al juego
          </button>
        )}
      </div>
    </>
  );
};
