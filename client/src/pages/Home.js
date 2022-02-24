import React from "react";
import { Container } from "react-bootstrap";
import HomeHero from "../components/Homehero";
import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    //smooth scroll if on same page routing
    <Container>
      <HomeHero />
      <SearchBar />
    </Container>
  );
};

export default Home;
