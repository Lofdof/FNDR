import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div>
      <footer>
        <div className="inner-content">
          <ul className="nav-links">
            <li>
              <Link to="/reel">Reel</Link>
            </li>
            <li>
              <Link to="/">WatchList</Link>
            </li>
            <li>
              <Link to="/watched">Watched</Link>
            </li>
            <li>
              <Link to="/add" className="btn">
                + Add
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};
