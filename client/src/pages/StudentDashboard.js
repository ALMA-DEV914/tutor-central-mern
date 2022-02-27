import React from "react";
import Profile from "../components/Profile";
import { Container } from "react-bootstrap";
import UpdateProfilePic from "../components/UpdateProfile";

const studentDashboard = (props) =>{
  return (
    <>
    <Container>
        <Profile />
        <UpdateProfilePic />
    </Container>
    </>
  );
}

export default studentDashboard;