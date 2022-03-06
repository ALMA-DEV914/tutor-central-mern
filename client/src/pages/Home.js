import React from "react";
import Auth from "../utils/auth";
//import HomeHero from "../components/Homehero";
// import SearchBar from "../components/SearchBar";
import TutorDisplay from "../components/TutorDisplay";
import HomeHeader from "../components/HomeHeader";

const Home = (props) => {
  if (props.logout) {
    Auth.logout();
  }

  return (
    //smooth scroll if on same page routing
    <>
       <HomeHeader/>
      <TutorDisplay />
  
   </>
  );
};

export default Home;
