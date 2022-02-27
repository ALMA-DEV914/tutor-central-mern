import React, { useState } from "react";
import Tutor from "../Tutor";
import { Row, Col } from "react-bootstrap";
import { QUERY_TUTORS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import SearchBar from "../SearchBar";

const TutorDisplay = () => {
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
  );
};

export default TutorDisplay;
