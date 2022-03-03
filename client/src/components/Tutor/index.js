import React from "react";
import { Card, Button } from "react-bootstrap";

const Tutor = ({ tutor }) => {
  return (
    <Card>
      <Card.Img variant='top' src='https://via.placeholder.com/150' />
      <Card.Body>
        <Card.Title>{tutor.userId.username}</Card.Title>
        <Card.Text>
          <span>Rating: 5 Stars</span>
          <span>Hourly Rate: {tutor?.hourlyRate}</span>
          <span>Expertise: JavaScript, CSS, HTML</span>
          <span>
            Bio: Some quick example text to build on the card title and make up
            the bulk of the card's content.
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
