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
        password: formState.password,
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

  if (loading) {
    return <div>Loading...</div>;
  }

<<<<<<< HEAD
  function AlertDismissibleExample() {
    const [show, setShow] = useState(true);

    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Hey! You got a new message!</Alert.Heading>
        </Alert>
      );
    }
    return <Button onClick={() => setShow(true)}>Show Messages</Button>;
  }

  return (
    <>
      <Row className="mt-4">
        <Col>
          <img
            src={data.me.user.photo}
            alt="profile"
            style={{
              width: "400px",
              borderRadius: "100%",
              height: "400px",
              boxShadow: "8px 8px 8px gray",
            }}
          />
        </Col>
        <Col className="mt-4">
          <div>
            <h2>Your Dashboard</h2>
          </div>
          <div>
            <div>
              <p>
                <b>Name:</b> {data.me.user.username}
              </p>
              <p>
                <b>Email Address:</b> {data.me.user.email}
              </p>
              <p>
                <b>Hourly rate: $</b>
                {data.me.tutor.hourlyRate}
              </p>
              <p>
                <b>Expertises:</b> {data.me.tutor.knownSubjects}
              </p>
              <p>
                <b>Bio:</b> {data.me.tutor.bio}
              </p>

              {/* <p>{data.me.tutor._id}</p> */}
            </div>
          </div>
          <div>
            <h3>Messages</h3>
            <AlertDismissibleExample />
          </div>
          <div>
            <h3>Student Lists</h3>
          </div>
        </Col>
        <Form.Group>
          <Card className="p-4" style={{ width: "28rem" }}>
            <h3>Update Username and Password</h3>
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input m-2"
                placeholder="username"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              {/* {errorMessage && (
            <div>
              <p className="error-text">{errorMessage}</p>
            </div>
          )} */}
              <Button className="btn d-block" variant="primary" type="submit">
                Submit
              </Button>
            </form>
          </Card>
        </Form.Group>
      </Row>
    </>
=======
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
              <Col sm={6}>
                <Image
                  thumbnail={true}
                  src={data.me.user.photo}
                  fluid={true}
                ></Image>
                
              </Col>
              <Col sm={6}>
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
                      value={formState.hourlyRate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className='mb-2'>
                    <Form.Label>Skills</Form.Label>
                    <Form.Control
                      as='input'
                      disabled={!formEditable}
                      name='knownSubjects'
                      value={formState.knownSubjects}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className='mb-2'>
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      as='textarea'
                      name='bio'
                      disabled={!formEditable}
                      value={formState.bio}
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
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Button>{`Update Password`}</Button>
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
                <Card key={index}>
                  <Card.Header>
                    <Card.Title>
                      <Link to={`/chat/${chatItem._id}`}>
                        Chat Id# {chatItem.student._id}
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
          </Card.Body>
        </Card>
      </Col>
    </Row>
>>>>>>> f2a17c1269ad2d4302b81f06c12a5c641126a0dd
  );
}

export default TutorProfile;
