import React from "react";
import {Link, Outlet} from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <nav className="nav-wrapper">
        <h2>TaTeTi</h2>
        <ul className="ul-nav">
          <li className="li-nav">
            <Link className="link" to="/game">
              Jugar
            </Link>
          </li>
          <li className="li-nav">
            <Link className="link" to="/boards">
              Tableros
            </Link>
          </li>
          {/* <li className="li-nav">
            <Link className="link" to="/login">
              Login
            </Link>
          </li> */}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
