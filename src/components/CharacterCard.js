import React from "react";
import "./CharacterCard.css";

const CharacterCard = ({ character }) => {
  return (
    <div className="character-card">
      <img
        className="character-image"
        src={character.image}
        alt={character.name}
      />
      <div className="character-info">
        <h3 className="character-name">{character.name}</h3>
        <p className="character-details">
          <span
            className={`status-indicator ${character.status.toLowerCase()}`}
          ></span>
          {character.status} - {character.species}
        </p>
      </div>
    </div>
  );
};
export default CharacterCard;