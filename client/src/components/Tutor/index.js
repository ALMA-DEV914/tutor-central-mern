/* eslint-disable no-template-curly-in-string */
import React from "react";
import { Card, Button } from "react-bootstrap";


const Tutor = ({ tutor }) => {
  
  return (
    <Card className="p-2 mt-4"  >
      <Card.Img variant='right' src={tutor.userId.photo} style={{borderRadius: '5px', width: '200px',boxShadow: '4px 4px 4px gray'}} />
      <Card.Body>
        <Card.Title>{tutor.userId.username}</Card.Title>
        <Card.Text>
          <span><b>Rating:</b> 5 Stars</span><br></br>
          <span><b>Hourly Rate: $</b> {tutor?.hourlyRate}</span><br></br>
          <span><b>Expertise:</b> {tutor?.knownSubjects}</span><br></br>
          <span>
          <b>Bio:</b> {tutor?.bio}
          </span>
        </Card.Text>
        <Button variant='success' href={`/tutor/${tutor.userId._id}`}>
          Sign up with {tutor.userId.username}
        </Button>
        <Button variant="danger" href={`mailto:${tutor.userId.email}`} className="m-2">Email</Button>
      </Card.Body>
    </Card>
  );
};

export default Tutor;
