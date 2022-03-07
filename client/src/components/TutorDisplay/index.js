import React, { useState } from "react";
import Tutor from "../Tutor";
import { Row, Col, Form } from "react-bootstrap";
import { QUERY_TUTORS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { idbPromise } from "../../utils/helpers";

const TutorDisplay = () => {
  const [query, setQuery] = useState("");

  const { loading, data } = useQuery(QUERY_TUTORS);

  if (data) {
    // console.log(data.tutors[0]);
    data.tutors.forEach((tutor) => {
      idbPromise("tutors", "put", tutor);
    });
  }

  if (loading) {
    return <div>Loading...</div>;
  } else if (!loading) {
    idbPromise("tutors", "get").then((indexedTutors) => {
      return (
        <>
          <Form className='mb-3'>
            <Form.Group>
              <Form.Control
                className='col-12 p-3 rounded border border-info'
                placeholder='Search for a skill'
                onChange={(event) => setQuery(event.target.value)}
              />
            </Form.Group>
          </Form>
          <Row>
            {indexedTutors
              .filter((tutor) => {
                return (
                  query === "" ||
                  (tutor.knownSubjects &&
                    tutor?.knownSubjects
                      .toLowerCase()
                      .includes(query.toLowerCase()))
                );
              })
              .map((tutor, index) => {
                return (
                  <Col sm={6} key={index}>
                    <Tutor tutor={tutor} className='mb-3'></Tutor>
                  </Col>
                );
              })}
          </Row>
        </>
      );
    });
  }

  return (
    <>
      <Form className='mb-3'>
        <Form.Group>
          <Form.Control
            className='col-12 p-3 rounded border border-info'
            placeholder='Search for a skill'
            onChange={(event) => setQuery(event.target.value)}
          />
        </Form.Group>
      </Form>
      <Row>
        {data.tutors
          .filter((tutor) => {
            return (
              query === "" ||
              (tutor.knownSubjects &&
                tutor?.knownSubjects
                  .toLowerCase()
                  .includes(query.toLowerCase()))
            );
          })
          .map((tutor, index) => {
            return (
              <Col sm={6} key={index}>
                <Tutor tutor={tutor} className='mb-3'></Tutor>
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default TutorDisplay;
