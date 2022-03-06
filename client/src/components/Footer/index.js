import React from "react";
import { FaGithub } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <Container
      fluid
      className="footer mt-4 p-2"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
     
      
      <Row className="p-4">
        <Col>Copyright © 2022@UC Berkely Bootcamp</Col>
        <Col>Alma Braun || Tarek Yousef || Tom Bellenger</Col>
        <Col>
          <a href="https://github.com/tarekyou/project3" className="text-light">
            <FaGithub className="text-dark" style={{fontSize: '25px'}} /> Source Code
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
