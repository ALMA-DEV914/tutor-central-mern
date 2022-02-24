import { gql } from "@apollo/client";

export const QUERY_POSTS = gql`
  query posts($username: String) {
    posts(username: $username) {
      _id
      postText
      createdAt
      username
      comments {
        _id
        createdAt
        username
        commentText
      }
    }
  }
`;
export const QUERY_CATEGORIES = gql`
  query categories {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_POST = gql`
  query post($id: ID!) {
    post(_id: $id) {
      _id
      postText
      createdAt
      username
      comments {
        _id
        createdAt
        username
        commentText
      }
    }
  }
`;

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
export const GET_FEEDBACK = gql`
    query Feedback {
        Feedback(sortBy: { field: "createdAt", order: DESC }) {
            _id
            username
            email
            category
            message
            image
            createdAt
            archived
        }
    }
`;