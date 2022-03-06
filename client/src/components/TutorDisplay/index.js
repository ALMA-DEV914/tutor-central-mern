import React, { useState } from "react";
import Tutor from "../Tutor";
import { Row, Col} from "react-bootstrap";
import { QUERY_TUTORS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import StarRatingDemo from "../StarRating";

const TutorDisplay = () => {
  const [query, setQuery] = useState("");

  const { loading, data } = useQuery(QUERY_TUTORS);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
     <Row>
       <Col sm={7} className='mx-2 my-4'>
       <input className="col-lg-12 p-3" style={{borderRadius: '5px', backgroundColor: 'blanchedalmond', borderStyle: 'hidden' }}
        placeholder='Enter search term'
        onChange={(event) => setQuery(event.target.value)}/>
       
    
    
    <p>Get help from our technologies experts!</p>
      {data.tutors
        .filter((tutor) => {
          if (query === "") {
            return tutor;
          } else if (
            tutor.userId.email.toLowerCase().includes(query.toLowerCase()) ||
            tutor.userId.username.toLowerCase().includes(query.toLowerCase())
          ) {
            return tutor;
          }
        })
        .map((tutor, index) => {
          return (
            <>
            <Col key={index} sm={12} className="mx-2">
              <Tutor tutor={tutor}></Tutor>
              </Col>
          </>
          );
        })}
    </Col>
      <Col sm={4}>Feedback section goes here
      <StarRatingDemo/></Col>
    </Row>
  </>
  );
};

export default TutorDisplay;
