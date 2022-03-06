/* eslint-disable no-template-curly-in-string */
import React from "react";
import { Card, Button, Col,Container, Row } from "react-bootstrap";
import RatingIcon from "../Ratings";

const Tutor = ({ tutor }) => {
  const [rating, setRating] = React.useState(0);
    const [hoverRating, setHoverRating] = React.useState(0);
    const onMouseEnter = (index) => {
      setHoverRating(index);
    };
    const onMouseLeave = () => {
      setHoverRating(0);
    };
    const onSaveRating = (index) => {
      setRating(index);
    };
  return (
    <Card className="mt-2 p-2">
      <Container>
        <Row>
      <Col xs={4} className='p-1' >
      <Card.Img variant='right' src={tutor.userId.photo} style={{borderRadius: '100%', width: '120px',boxShadow: '8px 8px 8px gray',}} /><br></br>
      <Button className="mt-4" variant='info' href={`/tutor/${tutor.userId._id}`}>
         Get help
        </Button>
        <Button className="mt-4" variant="danger" href={`mailto:${tutor.userId.email}`} >Email</Button>
        </Col>

        <Col>
      <Card.Body>
        <Card.Title>{tutor.userId.username}</Card.Title>
        <Card.Text>
          <span><div style={{display:'inline-flex'}}><b>Rating:</b> {" "} {[1, 2, 3, 4, 5].map((index) => {
          return (
            <RatingIcon 
              index={index} 
              rating={rating} 
              hoverRating={hoverRating} 
              onMouseEnter={onMouseEnter} 
              onMouseLeave={onMouseLeave} 
              onSaveRating={onSaveRating} />
          )
        })}
        </div></span>
        <br></br>
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
