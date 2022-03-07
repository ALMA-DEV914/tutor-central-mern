import React from "react";
import Auth from "../../utils/auth";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../../assets/logo.jpg";

function Header() {
  return (
    <Navbar bg='primary p-4' variant='dark' collapseOnSelect expand='lg'>
      <Container fluid>
        <Navbar.Brand href='/'>
          <img src={logo} alt='logo' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar' />
        <Navbar.Collapse id='responsive-navbar'>
          <Nav className='me-auto' style={{ fontSize: "18px" }}>
            <Nav.Link href='/'>Home</Nav.Link>
            {Auth.loggedIn() && Auth.getProfile().data.role === "tutor" && (
              <>
                <Nav.Link href='/tutor-profile'>Profile</Nav.Link>
                <Nav.Link href='/logout'>Logout</Nav.Link>
              </>
            )}
            {Auth.loggedIn() && Auth.getProfile().data.role === "student" && (
              <>
                <Nav.Link href='/student-profile'>Profile</Nav.Link>
                <Nav.Link href='/logout'>Logout</Nav.Link>
              </>
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
