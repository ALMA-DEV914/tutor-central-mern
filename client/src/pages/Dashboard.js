import React from "react";
import HomeHero from "../components/Homehero";

const Dashboard = (params) => {
  const mainColor = "#2e4fc7";
  return (
    //smooth scroll if on same page routing
        <div className="home">
            <HomeHero bgColor={mainColor} />
        </div>
  );
};

export default Dashiboard;