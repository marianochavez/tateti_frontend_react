import {BrowserRouter, Route, Routes, Link} from "react-router-dom";

import {LoginScreen} from "../components/auth/LoginScreen";
import {RegisterScreen} from "../components/auth/RegisterScreen";
import {AllBoards} from "../components/board/AllBoards";
import {Board} from "../components/board/Board";
import {Home} from "../components/board/Home";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/">
          <Route element={<AllBoards />} path="boards" />
          <Route element={<Board />} path="game" />
        </Route>
        <Route element={<LoginScreen />} path="/login" />
        <Route element={<RegisterScreen />} path="/register" />
        <Route
          element={
            <main style={{padding: "1rem"}}>
              <p>There&apos;s nothing here!</p>
              <Link to="/">Ir al inicio</Link>
            </main>
          }
          path="*"
        />
      </Routes>
    </BrowserRouter>
  );
};
