import React, { useState} from "react";
import {
    Jumbotron,
    Container,
    CardColumns,
    Col,
    Form,
    Button,
    Card,
} from "react-bootstrap";

import { searchTutors } from "../utils/tutorsApi";

const SearchTutors = () => {
    // create state for holding returned api data
    const [searchedTutors, setSearchedTutors] = useState([]);
    // create state for holding our search field data
    const [searchInput, setSearchInput] = useState("");

    // create method to search for books and set state on form submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            const response = await searchTutors(searchInput);

            if (!response.ok) {
                throw new Error("something went wrong!");
            }

            const { items } = await response.json();

            const tutorData = items.map((tutor) => ({
                tutorId: tutor.id,
                name: tutor.name,
                tag_line: tutor.volumeInfo.tag_line,
                primary_description: tutor.volumeInfo.primary_description,
                photo: tutor.volumeInfo.photoLinks?.thumbnail || "",
                town: tutor.town,
                country: tutor.country,
                hourly_rate: [],
                tutor_qualifucation: [],  
                skills: [
                    {
                    subject: tutor.subject,
                    category: tutor.category,
                    qual_levels: []
                    },
                
                ],
                labels: [],
                    review_rating: tutor.rating,
                    review_duration: 352800
            }));

            setSearchedTutors(tutorData);
            setSearchInput("");
        } catch (err) {
            console.error(err);
        }
    };
       
    return (
        <>
            <Jumbotron fluid className="text-light bg-dark">
                <Container>
                    <h1>Search for a Tutors!</h1>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Row>
                            <Col xs={12} md={8}>
                                <Form.Control
                                    name="searchInput"
                                    value={searchInput}
                                    onChange={(e) =>
                                        setSearchInput(e.target.value)
                                    }
                                    type="text"
                                    size="lg"
                                    placeholder="Search for a book"
                                />
                            </Col>
                            <Col xs={12} md={4}>
                                <Button
                                    type="submit"
                                    variant="success"
                                    size="lg"
                                >
                                    Submit Search
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Container>
            </Jumbotron>

            <Container>
                <h2>
                    {searchedTutors.length
                        ? `Viewing ${searchedTutors.length} results:`
                        : "Search for a tutor to begin"}
                </h2>
                <CardColumns>
                    {searchedTutors.map((tutor) => {
                        return (
                            <Card key={tutor.tutorId} border="dark">
                                {tutor.photo ? (
                                    <Card.Img
                                        src={tutor.photo}
                                        alt={`The cover for ${tutor.name}`}
                                        variant="top"
                                    />
                                ) : null}
                                <Card.Body>
                                    <Card.Title>{tutor.name}</Card.Title>
                                    <p className="small">
                                       Tag_line: {tutor.tag_line}
                                    </p>
                                    <Card.Text>{tutor.primary_description}</Card.Text>
                                    <Card.Text>{tutor.town}</Card.Text>
                                    <Card.Text>{tutor.country}</Card.Text>
                                    <Card.Text>
                                    <p className="small">
                                       Skills: {tutor.skills}
                                    </p>
                                    </Card.Text>
                                    <Card.Text>
                                    <p className="small">
                                       Hourly rate: {tutor.skills}
                                    </p>
                                    </Card.Text>
                                    <Card.Text>
                                    <p className="small">
                                       Labels: {tutor.labels}
                                    </p>
                                    </Card.Text>
                                    <Card.Text>
                                    <p className="small">
                                       Reviews: {tutor.review_rating}
                                    </p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </Container>
        </>
    );
};

export default SearchTutors;
