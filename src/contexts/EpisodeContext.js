import React, { createContext, useState, useEffect, useContext } from "react";

const EpisodeContext = createContext();

export const useEpisodeContext = () => useContext(EpisodeContext);

export const EpisodeProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar dados do localStorage ao iniciar
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    const storedWatched = localStorage.getItem("watched");

    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    if (storedWatched) setWatched(JSON.parse(storedWatched));

    setIsLoaded(true);
  }, []);

  // Salvar dados no localStorage quando mudam (só depois de carregar)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("watched", JSON.stringify(watched));
    }
  }, [watched, isLoaded]);

  const toggleFavorite = (episodeId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(episodeId)) {
        return prevFavorites.filter((id) => id !== episodeId);
      } else {
        return [...prevFavorites, episodeId];
      }
    });
  };

  const toggleWatched = (episodeId) => {
    setWatched((prevWatched) => {
      if (prevWatched.includes(episodeId)) {
        return prevWatched.filter((id) => id !== episodeId);
      } else {
        return [...prevWatched, episodeId];
      }
    });
  };

  const isFavorite = (episodeId) => favorites.includes(episodeId);
  const isWatched = (episodeId) => watched.includes(episodeId);

  return (
    <EpisodeContext.Provider
      value={{
        favorites,
        watched,
        isLoaded,
        toggleFavorite,
        toggleWatched,
        isFavorite,
        isWatched,
      }}
    >
      {children}
    </EpisodeContext.Provider>
  );
};