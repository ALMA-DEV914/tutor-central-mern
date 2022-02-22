import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($postText: String!) {
    addPost(postText: $postText) {
      _id
      postText
      createdAt
      username
      comments {
        _id
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($commentText: String!) {
    addPost(commentText: $commentText) {
      _id
      commentText
      createdAt
      username
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation addCategory($name: String!) {
    addCategory(name: $name) {
      _id
      name
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($postText: String!) {
    updatePost(postText: $postText) {
      _id
      postText
      createdAt
      username
      comments {
        _id
      }
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment($commentText: String!) {
    updateComment(commentText: $commentText) {
      _id
      commentText
      createdAt
      username
    }
  }
`;
