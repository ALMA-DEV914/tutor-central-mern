import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { UPDATE_TUTOR } from "../utils/mutations";
import { Button, Card, Col, Form, Row, Image } from "react-bootstrap";

function TutorProfile() {
  const { loading, data, refetch } = useQuery(QUERY_ME, {
    onCompleted: (d) => {
      console.log("setting form state with data");
      console.log(d);
      const { email, username } = d.me.user;
      const { hourlyRate, knownSubjects, bio } = d.me.tutor;
      setFormState({
        ...formState,
        username,
        email,
        hourlyRate,
        knownSubjects,
        bio,
      });
    },
  });
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    hourlyRate: "",
    email: "",
    bio: "",
    knownSubjects: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setFormState({ ...formState, [name]: value });
  };

  const [formEditable, setFormEditable] = useState(false);
  const [updateUser] = useMutation(UPDATE_TUTOR);

  const saveUpdates = async (event) => {
    event.preventDefault();
    console.log("saving updates to form data");
    const update = await updateUser({
      variables: {
        username: formState.username,
        hourlyRate: formState.hourlyRate,
        knownSubjects: formState.knownSubjects,
        bio: formState.bio,
      },
    });
    console.log(update);
    refetch();
    setFormEditable(false);
  };

  const allowUpdates = async (event) => {
    console.log(data);
    console.log("allow updates to form data");
    setFormEditable(true);
  };

  const updatePassword = async (event) => {
    console.log("doing password update");
    const update = await updateUser({
      variables: {
        password: formState.password,
      },
    });
    console.log(update);
    setFormState({ ...formState, password: "" });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Auth.loggedIn()) {
    return <div>Not logged in</div>;
  }

  return (
    <Row className='mt-4'>
      <Col sm={6}>
        <Card>
          <Card.Header>
            <Card.Title>Your Details</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <Image
                  thumbnail={true}
                  src={data.me.user.photo}
                  fluid={true}
                ></Image>
              </Col>
              <Col md={6}>
                <Form onSubmit={saveUpdates}>
                  <Form.Group className='mb-2'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      disabled={!formEditable}
                      name='username'
                      type='text'
                      value={formState.username}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className='mb-2'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      as='input'
                      disabled={true}
                      name='email'
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className='mb-2'>
                    <Form.Label>Hourly Rate</Form.Label>
                    <Form.Control
                      as='input'
                      disabled={!formEditable}
                      name='hourlyRate'
                      value={formState.hourlyRate || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className='mb-2'>
                    <Form.Label>Skills</Form.Label>
                    <Form.Control
                      as='input'
                      disabled={!formEditable}
                      name='knownSubjects'
                      value={formState.knownSubjects || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className='mb-2'>
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      as='textarea'
                      name='bio'
                      disabled={!formEditable}
                      value={formState.bio || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Button
                    className='mb-2'
                    variant={formEditable ? "danger" : "primary"}
                    onClick={formEditable ? saveUpdates : allowUpdates}
                  >
                    {formEditable ? "Save" : "Edit"}
                  </Button>
                </Form>
                <Form>
                  <Form.Group className='mb-2'>
                    <Form.Label>Update Password</Form.Label>
                    <Form.Control
                      as='input'
                      name='password'
                      type='password'
                      value={formState.password || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Button onClick={updatePassword}>{`Update Password`}</Button>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col sm={6}>
        <Card>
          <Card.Header>
            <Card.Title>Dashboard</Card.Title>
          </Card.Header>
          <Card.Body>
            {data.me.user.chats.map((chatItem, index) => {
              return (
                <Card key={index} className='mb-3'>
                  <Card.Header>
                    <Card.Title>
                      <Link to={`/chat/${chatItem._id}`}>
                        Chat with {chatItem.student.username}
                      </Link>
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    Created {chatItem.createdAt} with {chatItem.messages.length}{" "}
                    messages
                  </Card.Body>
                </Card>
              );
            })}
            {data.me.user.chats.length === 0 &&
              "Student messages will appear here"}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default TutorProfile;
