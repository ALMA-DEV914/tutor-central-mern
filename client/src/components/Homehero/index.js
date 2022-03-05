import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import RatingIcon from "../Ratings";

const HomeHero = ({ tutor }) => {
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
   
    <Row className="col-lg-12
    justify-content-md-center my-4 bg-light">
    <Col xs={6} md={4} className="p-4 mt-4">
      <img  src={tutor.userId.photo} alt="profile" style={{width: '400px', borderRadius:"5%", height: '400px'}}/>
      </Col>
      
      <Col xs={12} md={8} className="p-4 mt-4">
      <h3>{tutor.userId.username}</h3>
       <p><span> 
       <div style={{display: 'inline-flex'}}><b>Ratings:</b> {" "}{[1, 2, 3, 4, 5].map((index) => {
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
        </div>
    </span><br></br>
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
