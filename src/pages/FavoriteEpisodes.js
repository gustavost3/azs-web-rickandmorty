import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import EpisodeCard from "../components/EpisodeCard";
import SearchBar from "../components/SearchBar";
import { useEpisodeContext } from "../contexts/EpisodeContext";
import "./FavoriteEpisodes.css";

const GET_EPISODES_BY_IDS = gql`
  query GetEpisodesByIds($ids: [ID!]!) {
    episodesByIds(ids: $ids) {
      id
      name
      air_date
      episode
      characters {
        id
      }
    }
  }
`;

const FavoriteEpisodes = () => {
    const { favorites } = useEpisodeContext();
    const [searchTerm, setSearchTerm] = useState("");

    const { loading, error, data } = useQuery(GET_EPISODES_BY_IDS, {
        variables: { ids: favorites },
        skip: favorites.length === 0,
    });

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    if (favorites.length === 0) {
        return (
            <div className="container">
                <h1>Episódios Favoritos</h1>
                <div className="empty-state">
                    <h2>Sem episódios favoritos</h2>
                    <p>Favorite episódios para que apareçam aqui!</p>
                </div>
            </div>
        );
    }

    if (loading)
        return <div className="loading-message">Buscando Episódios...</div>;
    if (error) return <div className="error-message">Erro: {error.message}</div>;

    // Filter episodes based on search term
    const filteredEpisodes =
        data?.episodesByIds.filter((episode) =>
            episode.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) || [];

    return (
        <div className="wrapper">
            <div className="container">
                <h1>Episódios Favoritos</h1>
                <SearchBar onSearch={handleSearch} />

                <div className="episode-list">
                    {filteredEpisodes.length > 0 ? (
                        filteredEpisodes.map((episode) => (
                            <EpisodeCard key={episode.id} episode={episode} />
                        ))
                    ) : (
                        <div className="empty-state">
                            <h2>Nenhum episódio encontrado</h2>
                            <p>Tente uma busca diferente!</p>
                            <div className="rick-logo">
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default FavoriteEpisodes;