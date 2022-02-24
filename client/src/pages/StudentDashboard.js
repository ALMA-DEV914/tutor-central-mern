import React from "react";
import Profile from "../components/Profile";

const StuDashboard = () => {
  return (
    //smooth scroll if on same page routing
    <div className="dashboard">
      {<Profile />}
    </div> 
    
  );
};

export default StuDashboard;