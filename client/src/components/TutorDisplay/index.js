import React, { useState } from "react";
import Tutor from "../Tutor";
import { Row, Col } from "react-bootstrap";
import { QUERY_TUTORS } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const TutorDisplay = (params) => {
  // const [data, setData] = useState([
  //   { name: "Tom", email: "tbellenger@gmail.com", id: "709283745987045" },
  //   { name: "Tarek", email: "tarek@gmail.com", id: "709283745987045" },
  //   { name: "Alma", email: "alma@gmail.com", id: "709283745987045" },
  // ]);

  //setData(params);

  const [query, setQuery] = useState("");

  const { loading, data } = useQuery(QUERY_TUTORS);

  const tutors = data?.tutors || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Row>
      <input
        placeholder="Enter search term"
        onChange={(event) => setQuery(event.target.value)}
      />
      {tutors
        .filter((tutors) => {
          // console.log(tutors);
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
