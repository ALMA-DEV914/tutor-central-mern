import React from "react";
import { Card, Button } from "react-bootstrap";

const Tutor = ({ data }) => {
  return (
    <Card>
      <Card.Img variant="top" src="https://via.placeholder.com/150" />
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>
          <span>Rating: 5 Stars</span>
          <span>Hourly Rate: xxx</span>
          <span>Experise: JavaScript, CSS, HTML</span>
          <span>
            Bio: Some quick example text to build on the card title and make up
            the bulk of the card's content.
          </span>
        </Card.Text>
        <Button variant="primary" href={`/tutor/${data.id}`}>
          Sign up with {data.name}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Tutor;
