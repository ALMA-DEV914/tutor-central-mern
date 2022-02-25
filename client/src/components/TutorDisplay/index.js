import React, { useState } from "react";
import Tutor from "../Tutor";
import { Row, Col } from "react-bootstrap";

const TutorDisplay = (params) => {
  const [data, setData] = useState([
    { name: "Tom", email: "tbellenger@gmail.com", id: "709283745987045" },
    { name: "Tarek", email: "tarek@gmail.com", id: "709283745987045" },
    { name: "Alma", email: "alma@gmail.com", id: "709283745987045" },
  ]);

  //setData(params);

  return (
    <Row>
      {data.map((tutor, index) => {
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
