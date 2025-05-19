import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <>
    <header className="header-container">
      <h1 className="logo">
        <img className="logo-image" src="/RickFlix.png" alt="Rick and Morty Logo" />
      </h1>
      <nav className="nav">
        <Link to="/" className="nav-link">
          Todos os episódios
        </Link>
        <Link to="/favorites" className="nav-link">
          Favoritos
        </Link>
      </nav>
    </header>
    </>
    
  );
};

export default Header;