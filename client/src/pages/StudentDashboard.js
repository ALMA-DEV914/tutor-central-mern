import React from "react";
import Header from "../components/Header";
import Profile from "./Profile";
import { Container } from "react-bootstrap";
const studentDashboard = () =>{
  return (
    <Container>
      <Header />
      <div className="dashboard">
          <Profile />
        </div>
     </Container>
  );
}

export default studentDashboard;