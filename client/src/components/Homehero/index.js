import React from "react";
import { Button, Col, Row } from "react-bootstrap";


const HomeHero = ({ tutor }) => {
  
  return (
   
    <Row className="justify-content-md-center my-4">
    <Col xs={6} md={4} className="p-4 mt-4">
      <img  src={tutor.userId.photo} alt="profile" style={{width: '400px', borderRadius:"5%", height: '400px'}}/>
      </Col>
      
      <Col xs={12} md={8} className="p-4 mt-4">
      <h3>{tutor.userId.username}</h3>
       <p><span><b>Rating:</b> ★ ★ ★ ★ ★</span><br></br>
          <span><b>Hourly Rate: $</b> {tutor?.hourlyRate}</span><br></br>
          <span><b>Expertise:</b> {tutor?.knownSubjects}</span><br></br>
          <span>
          <b>Bio:</b> {tutor?.bio}
          </span><br></br>
          </p>
       
        <Button variant='success' href={`/tutor/${tutor.userId._id}`}>
         Get Live tutoring
        </Button>
      </Col>
      </Row>
  
  );
};

export default HomeHero;
