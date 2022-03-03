import React from "react";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_CHAT } from "../utils/mutations";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

const TutorDetail = () => {
  const { id } = useParams();
  const [addChat] = useMutation(ADD_CHAT);
  
  const handleChatClick = async () => {
    // create the chat between student and tutor
    const user = Auth.getProfile();
    console.log(user.data);
    if (user.data.role === "tutor") {
      // should only be students allowed
      console.log("chat is between students and tutors");
      return;
    }

    try {
      const data = await addChat({
        variables: {
          tutor: id,
        },
      });
      console.log(data.data.createChat);
      document.location.replace(`/chat/${data.data.createChat._id}`);
    } catch (err) {
      console.log(err);
    }
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
