/* eslint-disable no-template-curly-in-string */
import React from "react";
import { Card, Button, Col, Row, Badge } from "react-bootstrap";

const Tutor = ({ tutor }) => {
  return (
    <Card className='mt-2 p-2 bg-light'>
      <Row>
        <Col xs={4} className='m-3 text-center'>
          <Card.Img
            src={tutor.userId.photo}
            style={{
              borderRadius: "100%",
              width: "150px",
              height: "150px",
              objectFit: "cover",
            }}
          />
          <Button
            className='mt-4'
            variant='info'
            href={`/tutor/${tutor.userId._id}`}
          >
            Get help
          </Button>
        </Col>

        <Col>
          <Card.Body>
            <Card.Title>{tutor.userId.username}</Card.Title>
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
                      <Badge key={index} bg='secondary' className='m-1'>
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
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default Tutor;
