import React, { useState } from "react";
import Tutor from "../Tutor";
import { Row, Col, Form } from "react-bootstrap";
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
    <Row>
      <Col sm={8} className="py-4">
        <Form>
          <Form.Group>
            <Form.Control
              className='col-12 p-3 rounded border border-info'
              placeholder='Search for a skill'
              onChange={(event) => setQuery(event.target.value)}
            />
          </Form.Group>
        </Form>
        {data.tutors
          .filter((tutor) => {
            return (
              query === "" ||
              tutor.knownSubjects.toLowerCase().includes(query.toLowerCase())
            );
          })
          .map((tutor, index) => {
            return <Tutor key={index} tutor={tutor}></Tutor>;
          })}
      </Col>
      <Col sm={4}>
        Feedback section goes here
        <StarRatingDemo />
      </Col>
    </Row>
  );
};

export default TutorDisplay;
