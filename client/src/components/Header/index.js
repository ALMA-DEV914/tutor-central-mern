import React, {useState} from "react";
import Auth from "../../utils/auth";
import { Navbar, Container, Nav, NavDropdown, Row, Col, Button, Modal } from "react-bootstrap";
import logo from '../../assets/logo.jpeg';
import StudentSignup from "../../pages/StudentSignup";
import Login from "../../pages/Login";

function Header() {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
<>
    <Navbar fixed="top"  bg='primary' variant="dark" collapseOnSelect expand='lg'>
      <Container fluid >
      <Navbar.Brand href='/' style={{fontFamily: 'fantasy', fontSize: '28px', fontWeight: '600'}}><img src={logo} alt="logo" style={{width: '80px'}}/>Tutor-Student Connect</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar' />
        <Navbar.Collapse id='responsive-navbar'>
          <Nav className='me-auto' style={{fontSize:'18px'}}>
            <Nav.Link href='/'>Home</Nav.Link>
            <Nav.Link href='/features'>Features</Nav.Link>
            <Nav.Link href='/pricing'>Pricing</Nav.Link>

            {Auth.loggedIn() && (
                <>
                <Nav.Link href='/tutor-profile'>Profile</Nav.Link>
                  <Nav.Link href='/logout'>Logout</Nav.Link>
                </>
              )}
            
            {!Auth.loggedIn() && (
              <>
              <Nav.Link href="/login">
                Login</Nav.Link>

                <NavDropdown title='Signup'>
                  <NavDropdown.Item href='/student-signup'>
                    Student Signup
                  </NavDropdown.Item>
                  <NavDropdown.Item href='/tutor-signup'>
                    Tutor Signup
                  </NavDropdown.Item>
                </NavDropdown>
               
              </>
            )}
          </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
    <Row className="bg-primary text-center text-white justify-content-center mt-4"
      style={{width: '100%', margin: '2% auto', padding: '20px' }}>
      <Col sm={6} style={{margin: '8% auto'}}>
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
     </Row>
</>
  
  );
}

export default Header;
