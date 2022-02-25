import React from "react";
import HomeHero from "../components/Homehero";
import SearchBar from "../components/SearchBar";
import TutorDisplay from "../components/TutorDisplay";

const Home = () => {
  return (
    //smooth scroll if on same page routing
    <>
      <HomeHero />
      <SearchBar />
      <TutorDisplay />
    </>
  );
};

export default Home;
