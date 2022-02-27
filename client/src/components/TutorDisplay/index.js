import React, { useState } from "react";
import Tutor from "../Tutor";
import { Row, Col } from "react-bootstrap";
import { QUERY_TUTORS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import SearchBar from "../SearchBar";

const TutorDisplay = (params) => {
  const [query, setQuery] = useState("");

  const { loading, data } = useQuery(QUERY_TUTORS);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Row>
      <input
        placeholder='Enter search term'
        onChange={(event) => setQuery(event.target.value)}
      />
      {data.tutors
        .filter((tutors) => {
          if (query === "") {
            return tutors;
          } else if (
            tutors.email.toLowerCase().includes(query.toLowerCase()) ||
            tutors.username.toLowerCase().includes(query.toLowerCase())
          ) {
            return tutors;
          }
        })
        .map((tutor, index) => {
          return (
            <Col key={index} sm={4}>
              <Tutor data={tutor}></Tutor>
              <p>{tutor.username}</p>
            </Col>
          );
        })}
    </Row>
  );
};

export default TutorDisplay;
