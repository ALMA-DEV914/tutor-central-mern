import React from "react";
import Auth from "../utils/auth";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

const TutorDetail = () => {
  const { id } = useParams();

  const handleChatClick = () => {
    // create the chat between student and tutor
  };

  if (!Auth.loggedIn()) {
    return document.location.replace("/student-signup");
  }

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
