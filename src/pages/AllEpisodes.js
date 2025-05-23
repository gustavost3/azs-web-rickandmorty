import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import EpisodeCard from "../components/EpisodeCard";
import SearchBar from "../components/SearchBar";
import "./AllEpisodes.css";

const GET_EPISODES = gql`
  query GetEpisodes($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        air_date
        episode
        characters {
          id
        }
      }
    }
  }
`;

const AllEpisodes = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const { loading, error, data } = useQuery(GET_EPISODES, {
        variables: {
            page: currentPage,
            filter: searchTerm ? { name: searchTerm } : null,
        },
        fetchPolicy: 'cache-first', // Usa cache primeiro, só faz request se não tiver
        // ou
        // fetchPolicy: 'cache-and-network', // Mostra cache e atualiza em background
    });

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1); // Volta o indicador para a primeira página ao realizar uma nova busca
    };

    const handleNextPage = () => {
        if (data?.episodes?.info?.next) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (data?.episodes?.info?.prev) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading)
        return <div className="loading-message">Buscando Episódios...</div>;
    if (error) return <div className="error-message">Erro: {error.message}</div>;

    const totalPages = data?.episodes?.info?.pages || 0;

    return (
        <>
            <div className="wrapper">
                <div className="container">
                    <h1>Todos os Episódios</h1>
                    <SearchBar onSearch={handleSearch} />

                    <div className="episode-list">
                        {data?.episodes?.results.map((episode) => (
                            <EpisodeCard key={episode.id} episode={episode} />
                        ))}
                    </div>

                    <div className="pagination">
                        <button
                            className="pagination-button"
                            onClick={handlePrevPage}
                            disabled={!data?.episodes?.info?.prev}
                        >
                            Anterior
                        </button>

                        <div className="pagination-info">
                            Página {currentPage} de {totalPages}
                        </div>

                        <button
                            className="pagination-button"
                            onClick={handleNextPage}
                            disabled={!data?.episodes?.info?.next}
                        >
                            Próxima
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
};

export default AllEpisodes;