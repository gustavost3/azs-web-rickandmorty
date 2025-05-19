import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        placeholder="Busque episódios pelo nome" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" className="search-button">
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;