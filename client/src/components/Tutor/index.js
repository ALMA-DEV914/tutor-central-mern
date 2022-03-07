/* eslint-disable no-template-curly-in-string */
import React from "react";
import { Card, Button, Col, Row, Badge } from "react-bootstrap";

const Tutor = ({ tutor, showHelpButton = true }) => {
  return (
    <Card className='bg-light'>
      <Card.Header>
        <Card.Title>{tutor.userId.username}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col sm={4} className='text-center' style={{ minWidth: "170px" }}>
            <Card.Img
              className='rounded-circle my-3'
              src={tutor.userId.photo}
              style={{
                objectFit: "cover",
                width: "150px",
                height: "150px",
              }}
            />
            {showHelpButton && (
              <Button
                className='mx-2'
                variant='info'
                href={`/tutor/${tutor.userId._id}`}
              >
                Get help
              </Button>
            )}
          </Col>
          <Col>
            <Card.Text>
              <span>
                <b>Hourly Rate: $</b> {tutor?.hourlyRate}
              </span>
              <br></br>

              <span>
                <b>Expertise:</b>
                {tutor.knownSubjects &&
                  tutor?.knownSubjects.split(" ").map((subject, index) => {
                    return (
                      <Badge key={index} bg='secondary' className='mx-1'>
                        {subject}
                      </Badge>
                    );
                  })}
              </span>
              <br></br>
              <span>
                <b>Bio:</b> {tutor?.bio}
              </span>
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Tutor;
