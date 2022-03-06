import React, { useState } from "react";
//import Auth from "../utils/auth";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_CHAT } from "../utils/queries";
import { Card, Form, Button, Container } from "react-bootstrap";
import { ADD_MESSAGE } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";

function ChatDetail() {
  const { id } = useParams();
  const [formState, setFormState] = useState({
    messageText: "",
  });
  const [addMessage] = useMutation(ADD_MESSAGE);

  const { loading, data, refetch } = useQuery(QUERY_CHAT, {
    variables: { chatId: id },
  });
  if (!loading && data) {
    console.log(data);
    idbPromise("chats", "put", data.chat);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(id);
    try {
      const mutationResponse = await addMessage({
        variables: {
          chatId: id,
          messageText: formState.messageText,
        },
      });
      console.log(mutationResponse);
      setFormState({ messageText: "" });
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setFormState({ ...formState, [name]: value });
  };

  const getUsername = (id) => {
    if (data.chat.tutor._id === id) {
      return data.chat.tutor.username;
    } else {
      return data.chat.student.username;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  } else if (!loading) {
    idbPromise("chats", "get").then((indexedChats) => {
      return (
        <Card className='mb-3'>
          <Card.Header>
            <Card.Title>
              Viewing Chat# {indexedChats._id} between{" "}
              {indexedChats.tutor.username} and {indexedChats.student.username}{" "}
              on {indexedChats.createdAt}
            </Card.Title>
          </Card.Header>
        </Card>
      );
    });
  }

  return (
    <Card className='my-3'>
      <Card.Header>
        <Card.Title>
          Viewing Chat between {data.chat.tutor.username} and{" "}
          {data.chat.student.username} on {data.chat.createdAt}
        </Card.Title>
      </Card.Header>

      <Card.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Message</Form.Label>
            <Form.Control
              type='text'
              name='messageText'
              value={formState.messageText}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Button
            className='mb-3'
            variant='primary'
            type='submit'
            onClick={handleFormSubmit}
          >
            Send
          </Button>
        </Form>
        {data.chat.messages.map((message, index) => {
          return (
            <Card key={index} className='mb-3'>
              <Card.Body>
                <p>Date: {message.createdAt}</p>
                <p>From: {getUsername(message.from._id)}</p>
                <p>To: {getUsername(message.to._id)}</p>
                <p>Message: {message.messageText}</p>
              </Card.Body>
            </Card>
          );
        })}
      </Card.Body>
    </Card>
  );
}

export default ChatDetail;
