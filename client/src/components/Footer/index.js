import React from "react";
import { FaGithub } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <Container
      fluid
      className="footer mt-auto p-2"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      <Row style={{fontSize: '20px'}}>
        <Col >Copyright © 2022</Col>
        <Col>Alma Brun, Tarek Yousef, Tom Bellenger</Col>
        <Col style={{fontSize: "25px"}}>
          <a href="https://github.com/tarekyou/project3">
            <FaGithub className="text-dark" /> 
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
