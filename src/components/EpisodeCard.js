import React from "react";
import { Link } from "react-router-dom";
import { useEpisodeContext } from "../contexts/EpisodeContext";
import "./EpisodeCard.css";

const EpisodeCard = ({ episode }) => {
  const { isFavorite, isWatched, toggleFavorite, toggleWatched } =
    useEpisodeContext();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="card">
      <div className="episode-info">
        <h3 className="episode-title">
          <Link to={`/episode/${episode.id}`} className="episode-link">
            {episode.episode} - {episode.name}
          </Link>
        </h3>
        <p className="episode-details">
          Data em que foi ao ar: {formatDate(episode.air_date)}
        </p>
        <p className="episode-details">
          Quantidade de personagens: {episode.characters.length}
        </p>
      </div>
      <div className="action-buttons">
        <button
          className={`favorite-button ${
            isFavorite(episode.id) ? "active" : ""
          }`}
          onClick={() => toggleFavorite(episode.id)}
          title={
            isFavorite(episode.id)
              ? "Remover dos Favoritos"
              : "Adicionar aos Favoritos"
          }
        >
          {isFavorite(episode.id) ? "★" : "☆"}
        </button>
        <button
          className={`watched-button ${isWatched(episode.id) ? "active" : ""}`}
          onClick={() => toggleWatched(episode.id)}
          title={
            isWatched(episode.id) ? "Marcar como Assistido" : "Marcar como Não Assistido"
          }
        >
          {isWatched(episode.id) ? "✓" : "○"}
        </button>
      </div>
    </div>
  );
};

export default EpisodeCard;