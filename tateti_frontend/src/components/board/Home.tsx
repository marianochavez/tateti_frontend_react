import {useState, useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";

import {Navbar} from "../ui/Navbar";
import {createBoard, joinGame} from "../../helpers/boardApi";
import {logout} from "../../helpers/authApi";

export const Home = () => {
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const players = JSON.parse(localStorage.getItem("players") || "{}");
  const board = JSON.parse(localStorage.getItem("board") || "{}");
  const [isLogged, setIsLogged] = useState(false);
  const [isLogged2, setIsLogged2] = useState(false);
  const [isBoardCreated, setIsBoardCreated] = useState(
    localStorage.getItem("board") ? true : false,
  );
  const [isBoardJoined, setIsBoardJoined] = useState(board.state === "Qeue" ? false : true);

  useEffect(() => {
    if (players[Object.keys(players)[0]]) setIsLogged(true);
    if (players[Object.keys(players)[1]]) setIsLogged2(true);
  }, [isLogged, isLogged2, players]);

  useEffect(() => {
    board.id ? setIsBoardCreated(true) : setIsBoardCreated(false);
  }, [board]);

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

  const handleLogout = async (num: number) => {
    const players = JSON.parse(localStorage.getItem("players") || "{}");
    const player = Object.keys(players)[num];

    const logoutPl = await logout(players[player].token);

    if (logoutPl) {
      delete players[player];
      if (Object.keys(players).length === 0) {
        localStorage.removeItem("players");
        setIsLogged(false);
        setIsLogged2(false);
      } else {
        localStorage.setItem("players", JSON.stringify(players));
        setIsLogged2(false);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container " style={{padding: "2em"}}>
        {isLogged && isLogged2 && !isBoardCreated && (
          <button className="nes-btn is-success" onClick={handleCreateBoard}>
            Nuevo juego
          </button>
        )}
        {isBoardCreated && isBoardJoined && currentPath === "/" && (
          <Link className="nes-btn is-success" to="/game">
            Volver al juego
          </Link>
        )}
        {isLogged && !isLogged2 && (
          <Link className="nes-btn is-warning" to="/login">
            Logear jugador 2
          </Link>
        )}
        {!isLogged && !isLogged2 && (
          <Link className="nes-btn is-warning" to="/login">
            Logear jugador 1
          </Link>
        )}
        {isBoardCreated && !isBoardJoined && (
          <button className="nes-btn is-warning" onClick={handleJoinBoard}>
            Unirse al juego
          </button>
        )}
        {isLogged && currentPath === "/" && (
          <button className="nes-btn is-error" onClick={() => handleLogout(0)}>
            {`Deslogear ${players[Object.keys(players)[0]].name || "jugador 1"}`}
          </button>
        )}
        {isLogged2 && currentPath === "/" && (
          <button className="nes-btn is-error" onClick={() => handleLogout(1)}>
            {`Deslogear ${players[Object.keys(players)[1]]?.name || "jugador 2"}`}
          </button>
        )}
      </div>
    </>
  );
};
