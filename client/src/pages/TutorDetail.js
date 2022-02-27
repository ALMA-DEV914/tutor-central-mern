import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

const TutorDetail = () => {
  const { id } = useParams();

  const handleChatClick = () => {
    // create the chat between student and tutor
  };

  return (
    <div>
      <h1>TutorPage for {id}</h1>
      <p>
        <Button onClick={handleChatClick}>Start Chat</Button>
      </p>
    </div>
  );
};

export default TutorDetail;
