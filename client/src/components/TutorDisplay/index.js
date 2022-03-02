import React, { useState } from "react";
import Tutor from "../Tutor";
import { Row, Col } from "react-bootstrap";
import { QUERY_TUTORS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import SearchButton from "../SearchBar";

const TutorDisplay = () => {
  const [query, setQuery] = useState("");

  const { loading, data } = useQuery(QUERY_TUTORS);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Row className="mt-4 p-4">
      <Col>
      <input className="col-lg-11 p-1"
        placeholder='Enter search term'
        onChange={(event) => setQuery(event.target.value)}
      />
      {<SearchButton />}
    </Col>
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
  </Row>
  );
};

export default TutorDisplay;
