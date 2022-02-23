import React from "react";
import HomeHero from "../components/Homehero";

const Dashboard = (params) => {
  return (
    //smooth scroll if on same page routing
        <div className="home">
            <HomeHero/>
        </div>
  );
};

export default Dashboard;