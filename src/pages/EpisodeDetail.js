import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import CharacterCard from "../components/CharacterCard";
import { useEpisodeContext } from "../contexts/EpisodeContext";
import "./EpisodeDetail.css";

const GET_EPISODE = gql`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
        id
        name
        status
        species
        image
      }
    }
  }
`;

const EpisodeDetail = () => {
    const { id } = useParams();
    const { isFavorite, isWatched, toggleFavorite, toggleWatched } =
        useEpisodeContext();

    const { loading, error, data } = useQuery(GET_EPISODE, {
        variables: { id },
    });

    if (loading)
        return <div className="loading-message">Buscando detalhes do episódio...</div>;
    if (error) return <div className="error-message">Erro: {error.message}</div>;

    const episode = data.episode;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="wrapper">
            <div className="container">
                <div className="episode-header">
                    <h1 className="episode-title">
                        {episode.episode} - {episode.name}
                    </h1>
                    <p className="episode-info">Data em que foi ao ar: {formatDate(episode.air_date)}</p>
                    <p className="episode-info">Número de personagens: {episode.characters.length}</p>

                    <div className="button-container">
                        <button
                            className={`action-button ${isFavorite(episode.id) ? "favorite-active" : ""
                                }`}
                            onClick={() => toggleFavorite(episode.id)}
                        >
                            {isFavorite(episode.id)
                                ? "★ Remover dos Favoritos"
                                : "☆ Adicionar aos Favoritos"}
                        </button>
                        <button
                            className={`action-button ${isWatched(episode.id) ? "watched-active" : ""
                                }`}
                            onClick={() => toggleWatched(episode.id)}
                        >
                            {isWatched(episode.id) ? "✓ Assistido" : "○ Marcar como Assistido"}
                        </button>
                    </div>
                </div>

                <h2>Characters</h2>
                <div className="characters-grid">
                    {episode.characters.map((character) => (
                        <CharacterCard key={character.id} character={character} />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default EpisodeDetail;