import React from "react";
import Auth from "../../utils/auth";
import { Navbar, Container, Nav } from "react-bootstrap";

function Header() {
  return (
    <Navbar bg='primary' variant='dark' collapseOnSelect expand='lg'>
      <Container fluid>
        <Navbar.Brand href='/'>Tutor and Student</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar' />
        <Navbar.Collapse id='responsive-navbar'>
          <Nav className='me-auto'>
            <Nav.Link href='/'>Home</Nav.Link>
            <Nav.Link href='/features'>Features</Nav.Link>
            <Nav.Link href='/pricing'>Pricing</Nav.Link>

            {Auth.loggedIn() && <Nav.Link href='/logout'>Logout</Nav.Link>}
            {!Auth.loggedIn() && (
              <>
                <Nav.Link href='/login'>Login</Nav.Link>
                <Nav.Link href='/signup'>Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
