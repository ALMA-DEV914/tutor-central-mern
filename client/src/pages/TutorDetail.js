import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_CHAT } from "../utils/mutations";
import { QUERY_TUTOR } from "../utils/queries";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Tutor from "../components/Tutor";

const TutorDetail = () => {
  const { id } = useParams();
  const [addChat] = useMutation(ADD_CHAT);
  const { loading, data } = useQuery(QUERY_TUTOR, {
    variables: { userId: id },
  });

  const handleChatClick = async () => {
    // create the chat between student and tutor
    const user = Auth.getProfile();
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

  if (loading) {
    return "Loading...";
  }

  return (
    <>
      <Tutor tutor={data.tutor} showHelpButton={false} className='my-3'></Tutor>
      <Button className='mt-3' onClick={handleChatClick}>
        Start Chat
      </Button>
    </>
  );
};

export default TutorDetail;
