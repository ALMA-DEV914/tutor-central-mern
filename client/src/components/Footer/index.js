import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <Container
      fluid
      className='footer mt-auto'
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      <Row>
        <Col>Copyright © 2022</Col>
        <Col>Alma Brun, Tarek Yousef, Tom Bellenger</Col>
        <Col>
          <Link to='https://github.com/tarekyousef'>
            <FaGithub className='text-dark' />
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
