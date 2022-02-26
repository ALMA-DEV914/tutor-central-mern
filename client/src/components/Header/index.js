import React from "react";
import Auth from "../../utils/auth";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

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

            {Auth.loggedIn() && (
              <Nav.Link href='/' onClick={Auth.logout()}>
                Logout
              </Nav.Link>
            )}
            {!Auth.loggedIn() && (
              <>
                <Nav.Link href='/login'>Login</Nav.Link>
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
  );
}

export default Header;
