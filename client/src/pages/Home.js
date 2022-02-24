import React from "react";
import HomeHero from "../components/Homehero";
import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    //smooth scroll if on same page routing
    <>
      <HomeHero />
      <SearchBar />
    </>
  );
};

export default Home;
