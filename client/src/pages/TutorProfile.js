import React, { useState } from "react";
import Auth from "../utils/auth";
import { useLazyQuery, useMutation } from "@apollo/client";
import { QUERY_STUDENT, QUERY_TUTOR } from "../utils/queries";
import { Card, Form, Button } from "react-bootstrap";
import { UPDATE_USER } from "../utils/mutations";

function TutorProfile() {
  // return <div>Profile</div>;
  // let navigate = useNavigate();

  const [getStudent, { studLoad, stuErr, stuData }] =
    useLazyQuery(QUERY_STUDENT);
  const [getTutor, { tutLoad, tutErr, tutData }] = useLazyQuery(QUERY_TUTOR);
  const profile = Auth.getProfile().data;
  console.log(profile);
  const [formState, setFormState] = useState({
    username: profile.username,
    email: profile.email,
    userId: profile._id,
    role: profile.role,
    roleId: profile.roleId,
  });

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  };

  // if (profile.role === "tutor") {
  //   getTutor({ variables: { tutorId: profile.roleId } });
  // } else {
  //   getStudent({ variables: { studentId: profile.roleId } });
  // }

  // if (studLoad || tutLoad) {
  //   return "Loading...";
  // }

  return (
    <Card className='my-3'>
      <Card.Header>
        <Card.Title>{formState.email} Profile</Card.Title>
      </Card.Header>

      <Card.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              name='username'
              value={formState.username}
              onChange={(e) =>
                setFormState({ ...formState, username: e.currentTarget.value })
              }
            ></Form.Control>
          </Form.Group>
          <Button
            className='mb-3'
            variant='primary'
            type='submit'
            onClick={handleFormSubmit}
          >
            Update
          </Button>
        </Form>
        {/* {tutData &&
          tutData.userId.chats.map((chat, index) => {
            return (
              <Card key={index} className='mb-3'>
                <Card.Body>
                  <p>Date: {chat.createdAt}</p>
                  <p>From: {chat.tutor._id}</p>
                  <p>To: {chat.student._id}</p>
                </Card.Body>
              </Card>
            );
          })}
        {stuData &&
          stuData.userId.chats.map((chat, index) => {
            return (
              <Card key={index} className='mb-3'>
                <Card.Body>
                  <p>Date: {chat.createdAt}</p>
                  <p>From: {chat.tutor._id}</p>
                  <p>To: {chat.student._id}</p>
                </Card.Body>
              </Card>
            );
          })} */}
      </Card.Body>
    </Card>
  );
}

export default TutorProfile;
