import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useLocation } from "react-router-dom";
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
    const location = useLocation();

    useEffect(() => {
        // Resetar apenas quando vier de uma navegação externa (não de busca interna)
        setSearchTerm("");
        setCurrentPage(1);
    }, [location.key]); // location.key muda a cada navegação

    const { loading, error, data } = useQuery(GET_EPISODES, {
        variables: {
            page: currentPage,
            filter: searchTerm ? { name: searchTerm } : null,
        },
    });

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1); // Volta o indicador para a primeira página ao realizar uma nova busca
    };

    //Função para limpar busca
    const clearSearch = () => {
        setSearchTerm("");
        setCurrentPage(1);
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

                    {/* ✅ ADICIONAR: Mostrar indicador de busca ativa */}
                    {searchTerm && (
                        <div className="search-info" style={{
                            margin: '10px 0',
                            padding: '10px',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '5px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <span>Buscando por: "{searchTerm}"</span>
                            <button
                                onClick={clearSearch}
                                style={{
                                    padding: '5px 15px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '3px',
                                    cursor: 'pointer'
                                }}
                            >
                                Mostrar todos
                            </button>
                        </div>
                    )}

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