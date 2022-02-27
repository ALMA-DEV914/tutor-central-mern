import React, { useState } from "react";
import Tutor from "../Tutor";
import { Row, Col } from "react-bootstrap";
import { QUERY_TUTORS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
<<<<<<< HEAD

const TutorDisplay = (params) => {
  // const [data, setData] = useState([
  //   { name: "Tom", email: "tbellenger@gmail.com", id: "709283745987045" },
  //   { name: "Tarek", email: "tarek@gmail.com", id: "709283745987045" },
  //   { name: "Alma", email: "alma@gmail.com", id: "709283745987045" },
  // ]);

  //setData(params);

=======
import SearchBar from "../SearchBar";

const TutorDisplay = () => {
>>>>>>> develop
  const [query, setQuery] = useState("");

  const { loading, data } = useQuery(QUERY_TUTORS);

<<<<<<< HEAD
  const tutors = data?.tutors || {};

=======
>>>>>>> develop
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Row>
      <input
        placeholder='Enter search term'
        onChange={(event) => setQuery(event.target.value)}
      />
<<<<<<< HEAD
      {tutors
        .filter((tutors) => {
          // console.log(tutors);
=======
      {data.tutors
        .filter((tutor) => {
>>>>>>> develop
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
