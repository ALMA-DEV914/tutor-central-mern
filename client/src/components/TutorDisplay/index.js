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

  const { loading, data } = useQuery(QUERY_TUTORS);

  const tutors = data.tutors || {};
  console.log(tutors);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Row>
      {tutors.map((tutor, index) => {
        return (
          <Col key={index} sm={4}>
            <Tutor data={tutor}></Tutor>
          </Col>
        );
      })}
    </Row>
  );
};

export default TutorDisplay;
