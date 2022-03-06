/* eslint-disable no-template-curly-in-string */
import React from "react";
import { Card, Button, Col,Container, Row } from "react-bootstrap";


const Tutor = ({ tutor }) => {

  return (
    <Card className="mt-2 p-2 bg-light">
      <Container>
        <Row>
      <Col xs={4} className='p-1' >
      <Card.Img variant='right' src={tutor.userId.photo} style={{borderRadius: '100%', width: '150px',boxShadow: '8px 8px 8px gray',}} /><br></br>
      <Button className="mt-4" variant='info' href={`/tutor/${tutor.userId._id}`}>
         Get help
        </Button>
        <Button className="mt-4" variant="danger" href={`mailto:${tutor.userId.email}`} >Email</Button>
        </Col>

        <Col>
      <Card.Body>
        <Card.Title>{tutor.userId.username}</Card.Title>
        <Card.Text>
          <span><b>Hourly Rate: $</b> {tutor?.hourlyRate}</span><br></br>
        
          <span><b>Expertise:</b><button>{tutor?.knownSubjects}</button></span><br></br>
          <span>
          <b>Bio:</b> {tutor?.bio}
          </span>
    
      </Card.Text>
      </Card.Body>
      </Col>
      </Row>
      </Container>
    </Card>
  );
};

export default Tutor;
