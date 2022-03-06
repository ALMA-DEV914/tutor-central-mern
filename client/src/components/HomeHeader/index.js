import React, {useState} from 'react'
import { Col, Modal, Button, Container, Navbar} from 'react-bootstrap';
import StudentSignup from '../../pages/StudentSignup';

function HomeHeader(){
const [show, setShow] = useState(false);
  
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


return (
    <>
<Navbar>
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
    </Navbar>
    </>
)
};
export default HomeHeader;