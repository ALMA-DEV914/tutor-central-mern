import React, { useState } from "react";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { UPDATE_USER } from "../utils/mutations";

import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Image,
  Container,
} from "react-bootstrap";

function TutorProfile() {
  const { username, role, email, role_id, _id } = Auth.getProfile();
  const { loading, data } = useQuery(QUERY_ME);

  // console.log(data.me.user.username);
  // const [errorMessage, setErrorMessage] = useState("");
  const [formState, setFormState] = useState({
    username: username,
    password: "",
  });

  const [formEditable, setFormEditable] = useState(false);

  const [updateUser] = useMutation(UPDATE_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // if (!event.target.value.length) {
    //   setErrorMessage(`${event.target.name} is required.`);
    // } else {
    //   setErrorMessage("");
    // }
    console.log(data.me.user);
    console.log(event.target.value);

    if (!event.target.value.length) {
      setFormState({
        // ...formState,
        formState: { ...data.me.user },
      });
      // return { ...data.me.user };
    }

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // use try/catch instead of promises to handle errors
    try {
      // execute addUser mutation and pass in variable data from form
      const { data } = await updateUser({
        variables: { ...formState },
      });

      // console.log(data);
      Auth.loggedIn(data.updateUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  const saveUpdates = async (event) => {
    console.log("saving updates to form data");
    setFormEditable(false);
  };

  const allowUpdates = async (event) => {
    console.log("allow updates to form data");
    setFormEditable(true);
  };

  if (loading) {
    return <div>Loading...</div>;
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
                <Card>
                  <Image
                    thumbnail={true}
                    src={data.me.user.photo}
                    fluid={true}
                  ></Image>
                </Card>
              </Col>
              <Col sm={6}>
                <Card>
                  <Form>
                    <Form.Group>
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        as='input'
                        disabled={!formEditable}
                        value={data.me.user.username}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        as='input'
                        disabled={!formEditable}
                        value={data.me.user.email}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Hourly Rate</Form.Label>
                      <Form.Control
                        as='input'
                        disabled={!formEditable}
                        value={data.me.tutor.hourlyRate}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Skills</Form.Label>
                      <Form.Control
                        as='input'
                        disabled={!formEditable}
                        value={data.me.tutor.knownSubjects}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Bio</Form.Label>
                      <Form.Control
                        as='textarea'
                        disabled={!formEditable}
                        value={data.me.tutor.bio}
                      />
                    </Form.Group>
                    <Button onClick={formEditable ? saveUpdates : allowUpdates}>
                      {formEditable ? "Save" : "Edit"}
                    </Button>
                  </Form>
                  <Form>
                    <Form.Group>
                      <Form.Label>Update Password</Form.Label>
                      <Form.Control
                        as='input'
                        type='password'
                        disabled={true}
                        value=''
                      />
                    </Form.Group>
                    <Button>Update Password</Button>
                  </Form>
                </Card>
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
          <Card.Body></Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default TutorProfile;
