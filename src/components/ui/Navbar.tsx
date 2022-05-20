import {Link, Outlet, useLocation} from "react-router-dom";
import {useContext} from "react";

import {UserContext} from "../providers/UserProvider";

export const Navbar = () => {
  const {isLogged, isLogged2} = useContext(UserContext);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <nav className="nav-wrapper">
        <h2>TaTeTi</h2>
        <ul className="ul-nav">
          {currentPath !== "/" && (
            <li className="li-nav">
              <Link className="link" to="/">
                Inicio
              </Link>
            </li>
          )}
          {isLogged && isLogged2 && currentPath === "/" && (
            <li className="li-nav">
              <Link className="link" to="/historical">
                Historial
              </Link>
            </li>
          )}
          {(!isLogged || !isLogged2) && currentPath !== "/register" && (
            <li className="li-nav">
              <Link className="link" to="/register">
                Registrarme
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
