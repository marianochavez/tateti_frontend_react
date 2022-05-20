import {BrowserRouter, Route, Routes, Link} from "react-router-dom";

import {LoginScreen} from "../components/auth/LoginScreen";
import {RegisterScreen} from "../components/auth/RegisterScreen";
import {Historical} from "../components/board/Historical";
import {Board} from "../components/board/Board";
import {Home} from "../components/board/Home";
import {UserProvider} from "../components/providers/UserProvider";
import {BoardProvider} from "../components/providers/BoardProvider";

export const AppRouter = () => {
  return (
    <UserProvider>
      <BoardProvider>
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
      </BoardProvider>
    </UserProvider>
  );
};
