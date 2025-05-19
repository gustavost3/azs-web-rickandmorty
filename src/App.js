import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { EpisodeProvider } from "./contexts/EpisodeContext";
import client from "./apollo-client";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <EpisodeProvider>
        <Router>
          <Header />
          <Routes>
            
          </Routes>
        </Router>
      </EpisodeProvider>
    </ApolloProvider>
  );
}

export default App;