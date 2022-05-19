import React from "react";
import {Link, Outlet} from "react-router-dom";

export const Navbar = () => {
  const player = JSON.parse(localStorage.getItem("players") || "{}");

  return (
    <>
      <nav className="nav-wrapper">
        <h2>TaTeTi</h2>
        <ul className="ul-nav">
          <li className="li-nav">
            <Link className="link" to="/">
              Inicio
            </Link>
          </li>
          {Object.keys(player).length === 2 && (
            <li className="li-nav">
              <Link className="link" to="/historical">
                Historial
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
