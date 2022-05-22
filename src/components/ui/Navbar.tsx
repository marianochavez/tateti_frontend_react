import {Link, Outlet, useLocation} from "react-router-dom";
import {useContext} from "react";

import {UserContext} from "../providers/UserProvider";

export const Navbar = () => {
  const {isLogged, isLogged2} = useContext(UserContext);
  const currentPath = useLocation().pathname;

  return (
    <>
      <nav className="nav-wrapper">
        <h2 className="animate__animated animate__bounce">
          <span style={{color: "#6639A6"}}>T</span>a<span style={{color: "#3490DE"}}>T</span>e
          <span style={{color: "#6FE7DD"}}>T</span>i
        </h2>
        <ul className="ul-nav">
          {currentPath !== "/" && (
            <li className="li-nav">
              <Link className="link" to="/">
                <p className="animate__animated animate__fadeIn animate__slow">Inicio</p>
              </Link>
            </li>
          )}
          {isLogged && isLogged2 && currentPath === "/" && (
            <li className="li-nav">
              <Link className="link" to="/historical">
                <p className="animate__animated animate__fadeIn animate__slow">Historial</p>
              </Link>
            </li>
          )}
          {(!isLogged || !isLogged2) && currentPath === "/" && (
            <li className="li-nav">
              <Link className="link" to="/register">
                <p className="animate__animated animate__fadeIn animate__slow">Registrarme</p>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
