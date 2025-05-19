import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { EpisodeProvider } from "./contexts/EpisodeContext";
import client from "./apollo-client";
import Header from "./components/Header";
import AllEpisodes from "./pages/AllEpisodes";
import EpisodeDetail from "./pages/EpisodeDetail";
import FavoriteEpisodes from "./pages/FavoriteEpisodes";
import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <EpisodeProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<AllEpisodes />} />
            <Route path="/episode/:id" element={<EpisodeDetail />} />
            <Route path="/favorites" element={<FavoriteEpisodes />} />
          </Routes>
        </Router>
      </EpisodeProvider>
    </ApolloProvider>
  );
}

export default App;