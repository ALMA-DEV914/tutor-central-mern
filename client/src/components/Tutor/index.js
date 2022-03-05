/* eslint-disable no-template-curly-in-string */
import React from "react";
import { Card, Button } from "react-bootstrap";
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
    <Card className="p-2 mt-4"  >
      <Card.Img variant='right' src={tutor.userId.photo} style={{borderRadius: '5px', width: '200px',boxShadow: '4px 4px 4px gray'}} />
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
