import React, { useState } from "react";
import Auth from "../utils/auth";
import TutorDisplay from "../components/TutorDisplay";
import { Col, Modal, Button } from "react-bootstrap";
import StudentSignup from "./StudentSignup";

const Home = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (props.logout) {
    Auth.logout();
  }

  return (
    <>
      <Col sm={8} className='text-center mx-auto mt-5'>
        <h1 className='p-3'>The first place to look when you study</h1>
        <p className='p-2'>
          Tutor Central is a freelance marketplace for top developers to provide
          tutoring services. Learn from tutors and get your problems solved by
          experienced development freelancers.
        </p>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Welcome on board!</Modal.Title>
          </Modal.Header>
          <Modal.Body>{<StudentSignup />}</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {!Auth.loggedIn() && (
          <Button variant='danger' onClick={handleShow}>
            GET HELP NOW
          </Button>
        )}
      </Col>

      <hr />
      <TutorDisplay />
    </>
  );
};

export default Home;
