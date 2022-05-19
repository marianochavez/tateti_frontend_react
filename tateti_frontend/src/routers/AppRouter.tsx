import {BrowserRouter, Route, Routes, Link} from "react-router-dom";

import {LoginScreen} from "../components/auth/LoginScreen";
import {RegisterScreen} from "../components/auth/RegisterScreen";
import {Historical} from "../components/board/Historical";
import {Board} from "../components/board/Board";
import {Home} from "../components/board/Home";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/">
          <Route element={<Historical />} path="historical" />
          <Route element={<Board />} path="game" />
        </Route>
        <Route element={<LoginScreen />} path="/login" />
        <Route element={<RegisterScreen />} path="/register" />
        <Route
          element={
            <main style={{padding: "1rem"}}>
              <p>No hay nada por aqui! 404 :(</p>
              <Link to="/">Ir al inicio</Link>
            </main>
          }
          path="*"
        />
      </Routes>
    </BrowserRouter>
  );
};
