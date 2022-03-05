import React, { useState } from "react";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
// import { useNavigate } from "react-router-dom";
//import { useParams } from "react-router-dom";
import { UPDATE_USER } from "../utils/mutations";

import { Button, Card, Col, Form, Row, Alert } from "react-bootstrap";

function TutorProfile() {
  // return <div>Profile</div>;
  // let navigate = useNavigate();

  const { loading, data } = useQuery(QUERY_ME);

  // console.log(data.me.user.username);
  // const [errorMessage, setErrorMessage] = useState("");
  const [formState, setFormState] = useState({
    // username: `${data.me.user.username}`,
    // username: data.me.user.username,
    // password: `${data.me.user.password}`,
    username: ``,
    password: ``,
  });

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

  // const user = data?.me ||  {};
  // console.log(user);

  if (loading) {
    return <div>Loading...</div>;
  }

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
  );
}

export default TutorProfile;
