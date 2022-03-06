import React, {useState} from "react";
import Auth from "../utils/auth";
import TutorDisplay from "../components/TutorDisplay";
 import { Container, Col, Modal, Button} from "react-bootstrap";
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

<Container fluid className='text-center'>
      <Col sm={8} style={{margin: '8% auto'}}>
     <h1 className="mt-4 p-2">
     The first place to look when you study.
     </h1>
     <p className="p-2">Tutor-Connect is an on-demand marketplace for top Web development engineers, developers, consultants, architects, programmers, and tutors. Get your projects built by vetted Web development freelancers or learn from expert mentors with team training & coaching experiences.</p>
     <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Welcome on board!</Modal.Title>
          </Modal.Header>
          <Modal.Body>{<StudentSignup/>}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
     <Button variant="danger" onClick={handleShow}>
         GET HELP NOW
     </Button>
     </Col>
    </Container>
  
   <hr style={{heigth: '2px grey'}}>
     
   </hr>
    <TutorDisplay />
  
    </>
  );
};

export default Home;
