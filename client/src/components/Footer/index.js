import React from "react";
import { FaGithub } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <Container
      fluid
      className="footer mt-auto p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      <Row>
        <Col>Copyright © 2022@UC Berkely Bootcamp</Col>
        <Col>Alma Braun || Tarek Yousef || Tom Bellenger</Col>
        <Col>
          <a href="https://github.com/tarekyou/project3">
            <FaGithub className="text-dark" style={{fontSize: '20px'}} />
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
