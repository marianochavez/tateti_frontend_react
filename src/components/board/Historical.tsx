import {useContext, useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

import {UserContext} from "../providers/UserProvider";
import {BoardContext} from "../providers/BoardProvider";

export const Historical = () => {
  const {players, isLogged, isLogged2} = useContext(UserContext);
  const {getHistorical} = useContext(BoardContext);
  const [historical, setHistorical] = useState<any[]>([]);

  useEffect(() => {
    const historial = getHistorical(
      parseInt(Object.keys(players)[0]),
      parseInt(Object.keys(players)[1]),
    );

    historial.then((res) => {
      setHistorical(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLogged || !isLogged2) return <Navigate replace to="/" />;

  return (
    <div className="container">
      <h4>
        <i className="nes-icon trophy is-s" />
        Historial
        <i className="nes-icon trophy" />
      </h4>
      <div className="nes-table-responsive">
        <table className="nes-table is-bordered is-centered">
          <thead>
            <tr>
              <th>Tabla</th>
              <th>Ganador</th>
            </tr>
          </thead>
          <tbody>
            {historical.map((historial) => (
              <tr key={historial.id}>
                <td>{historial.id}</td>
                <td>{historial.winner ? historial.winner : "Abandonada"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
