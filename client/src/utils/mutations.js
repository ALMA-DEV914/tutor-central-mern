import { gql } from "@apollo/client";

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

export const ADD_FEEDBACK = gql`
    mutation AddFeedback(
        $username: String!
        $email: String!
        $tutor: String!
        $message: String!
        $image: String
    ) {
        addFeedback(
            username: $username
            email: $email
            category: $category
            message: $message
            image: $image
        ) {
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

export const ARCHIVE_FEEDBACK = gql`
    mutation ArchiveFeedback($feedbackId: ID!) {
        archiveFeedback(feedbackId: $feedbackId) {
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
export const USER_UPDATE_PASSWORD = gql`
    mutation UpdatePasswordMutation(
        $email: String!
        $oldPassword: String!
        $newPassword: String!
    ) {
        updatePassword(
            email: $email
            oldPassword: $oldPassword
            newPassword: $newPassword
        ) {
            _id
        }
    }
`;
export const GET_S3_URL = gql`
    mutation Mutation($isLoggedIn: Boolean!) {
        getS3Url(isLoggedIn: $isLoggedIn)
    }
`;

export const GET_S3_URL_AUTHENTICATED = gql`
    mutation Mutation($isLoggedIn: Boolean!) {
        getS3UrlAuthenticated(isLoggedIn: $isLoggedIn)
    }
`;

export const UPDATE_PROFILE_PIC = gql`
    mutation Mutation($userId: ID!, $profilePic: String!) {
        updateProfilePic(userId: $userId, profilePic: $profilePic) {
            _id
            username
            profilePic
        }
    }
`;
