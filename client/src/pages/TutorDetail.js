import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

const TutorDetail = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>TutorPage for {id}</h1>
      <p>
        <Button>Start Chat</Button>
      </p>
    </div>
  );
};

export default TutorDetail;
