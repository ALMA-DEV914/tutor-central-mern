import React from "react";
import { FaGithub } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <Container
      fluid
      className='footer mt-auto'
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      <Row className='p-4'>
        <Col className='text-start'>Copyright © 2022@UC Berkely Bootcamp</Col>
        <Col className='text-center'>
          Alma Braun || Tarek Yousef || Tom Bellenger
        </Col>
        <Col className='text-end'>
          <a href='https://github.com/tarekyou/project3' className='text-dark'>
            <FaGithub className='text-dark' style={{ fontSize: "25px" }} />
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
