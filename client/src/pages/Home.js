import React from "react";
import HomeHero from "../components/Homehero";
import SearchBar from "../components/SearchBar";

const Home = (params) => {
  return (
    //smooth scroll if on same page routing
    <div className='home'>
      <HomeHero />
      <SearchBar />
    </div>
  );
};

export default Home;
