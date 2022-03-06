import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import tutor from '../../assets/tutor.jpeg';
import { FaClock, FaTrophy, FaBookOpen, FaDesktop } from "react-icons/fa";
const TutorSlide = (props) => {
  

  return (
    <>
      <Container className="p-4 text-center">
        <Row style={{padding: '20px', margin: '5% auto'}}>
        <Col sm={8} className="p-4">
        <h1>Incoming virtual connection will be feature soon! Stay tuned.</h1>
        <p>Tell us what you need help with and our smart matching system will connect you with an online tutor. Sign up for a free trial using a debit/credit card.</p>
        <Button>REGISTER</Button>
        </Col>
         <Col sm={4}>
         <img src={tutor} alt="tutor-pic" style={{width: '400px'}}/>
          </Col>
        </Row>
       </Container>
       <Container className="py-4">
        <Row className="mt-4">
          <h2>Why Use Tutor-Central?</h2>
          <Col sm={5} className="mt-4 p-4 mx-2 bg-light">
          <h4>On-demand tutoring</h4>
          
          <FaClock/>
          <p>Connect with an online tutor in less than 30
          seconds, 24/7. It doesn’t matter if you want help with
          a single problem or you need a 3-hour lesson.</p>
          </Col>
          
          <Col sm={5} className="mt-4 p-4 bg-light">
          <h4>Learn from the best tutors</h4>
          <FaDesktop/>
          <p>Highly qualified tutors from the best universities
           across the globe ready to help. An acceptance rate
          of 4% means all our tutors are thoroughly screened.</p>
          </Col>
        </Row>
       
        <Row className="mt-4">
          <Col sm={5} className="mt-4 mx-2 bg-light">
            <h4>All the tools you need</h4>
            <FaTrophy/>
            <p>Our lesson space features a virtual whiteboard, text
               editor, audio/video chat, screensharing and so much
             more. All lessons are archived for your convenience.</p>
          </Col>
          <Col sm={5} className="mt-4 bg-light">
          <h4>Get help in any subject</h4>
          <FaBookOpen/>
          <p>We cover over 300 subjects across all grade levels.
         Whether it’s high school algebra or college-level
         Spanish, we have a tutor that can help.</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TutorSlide;
