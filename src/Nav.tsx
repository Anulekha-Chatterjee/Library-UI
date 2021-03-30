import React from "react";

import { Link } from "react-router-dom";

function Nav() {
  const Navstyle = {
    color: "white",
  };

  return (
    <div className="App">
      <nav>
        <ul className="nav-links">
          <Link style={Navstyle} to="/">
            <li>Home</li>
          </Link>
          <Link style={Navstyle} to="/books">
            <li>Books</li>
          </Link>
          <Link style={Navstyle} to="/find">
            <li>Find Book</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
