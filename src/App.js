import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { EpisodeProvider } from "./contexts/EpisodeContext";
import client from "./apollo-client";
import Header from "./components/Header";
import AllEpisodes from "./pages/AllEpisodes";
import EpisodeDetail from "./pages/EpisodeDetail";
import FavoriteEpisodes from "./pages/FavoriteEpisodes";
import "./App.css";

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<AllEpisodes key={location.pathname + location.key} />}
        />
        <Route path="/episode/:id" element={<EpisodeDetail />} />
        <Route path="/favorites" element={<FavoriteEpisodes />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <EpisodeProvider>
        <Router>
          <AppRoutes />
        </Router>
      </EpisodeProvider>
    </ApolloProvider>
  );
}

export default App;