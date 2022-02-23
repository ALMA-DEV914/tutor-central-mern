import React from "react";
import HomeHero from "../components/Homehero";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";

const Home = (params) => {
  const mainColor = "#2e4fc7";
  return (
    //smooth scroll if on same page routing
        <div className="home">
            <HomeHero bgColor={mainColor} />
            <SearchBar />
            <Footer />
        </div>
  );
};

export default Home;