import React, { useState } from "react";
import Tutor from "../Tutor";
import { Row, Col} from "react-bootstrap";
import { QUERY_TUTORS } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const TutorDisplay = () => {
  const [query, setQuery] = useState("");

  const { loading, data } = useQuery(QUERY_TUTORS);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Row className="mt-4 p-4 justify-content-center">
    <h1 className='display-2 p-4' style={{fontWeight: '400'}}>
      The <b style={{color: 'WindowText', fontFamily: ''}}>first place</b> to look when you study.
    </h1>

       <input className="col-lg-8 p-3" style={{borderRadius: '20px', backgroundColor: 'blanchedalmond', borderStyle: 'hidden' }}
        placeholder='Enter search term'
        onChange={(event) => setQuery(event.target.value)}
      /></Row>
     
    <Row className="mt-4">
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
            
            <Col key={index} sm={4}>
              <Tutor tutor={tutor}></Tutor>
              </Col>
          );
        })}
    </Row>
    
  </>
  );
};

export default TutorDisplay;
