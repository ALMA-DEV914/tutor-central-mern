import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {
function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/">
             HOME
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/signup">
              SINGUP
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              LOGIN
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="logo"><i className="fa fa-cog fa-spin"></i> PROJECT3</span>
         </Link>
      </h1>

      <nav className="nav">
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
