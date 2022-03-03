import React from "react";
import { Card, Button } from "react-bootstrap";

const Tutor = ({ tutor }) => {
  return (
    <Card>
      <Card.Img variant='top' src='https://via.placeholder.com/150' />
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
        <Button variant='primary' href={`/tutor/${tutor.userId._id}`}>
          Sign up with {tutor.userId.username}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Tutor;
