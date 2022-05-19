import {historical} from "../../helpers/boardApi";

export const Historical = () => {
  const historical = await historical();

  return (
    <div className="container">
      <div className="nes-table-responsive">
        <table className="nes-table is-bordered is-centered">
          <thead>
            <tr>
              <th>Tabla Nro</th>
              <th>Ganador</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Thou hast had a good evening</td>
              <td>Thou hast had a good night</td>
            </tr>
            <tr>
              <td>Thou hast had a good evening</td>
              <td>Thou hast had a good night</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
