import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      posts {
        _id
        postText
        createdAt
      }
    }
  }
`;

export const QUERY_TUTORS = gql`
  query tutors {
    tutors {
      _id
      userId {
        _id
        username
        email
        photo
        role
      }
      hourlyRate
      knownSubjects
      bio
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      posts {
        _id
        postText
        createdAt
        comments {
          _id
          createdAt
          commentText
          username
        }
      }
    }
  }
`;
