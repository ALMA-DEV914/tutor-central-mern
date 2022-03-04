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
export const ADD_TUTOR = gql`
  mutation addTutor(
    $firstName: String
    $lastName: String
    $role: String
    $username: String!
    $email: String!
    $photo: String
    $password: String!
    $hourlyRate: String!
    $knownSubjects: String!
    $bio: String!
  ) {
    addTutor(
      firstName: $firstName
      lastName: $lastName
      role: $role
      username: $username
      email: $email
      photo: $photo
      password: $password
      hourlyRate: $hourlyRate
      knownSubjects: $knownSubjects
      bio: $bio
    ) {
      token
      user {
        _id
      }
      tutor {
        _id
      }
    }
  }
`;
export const ADD_STUDENT = gql`
  mutation addStudent(
    $firstName: String
    $lastName: String
    $role: String
    $username: String!
    $email: String!
    $photo: String
    $password: String!
    $paymentInfo: String
    $bio: String
  ) {
    addStudent(
      firstName: $firstName
      lastName: $lastName
      role: $role
      username: $username
      email: $email
      photo: $photo
      password: $password
      paymentInfo: $paymentInfo
      bio: $bio
    ) {
      token
      user {
        _id
      }
      student {
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

export const UPDATE_USER = gql`
  mutation updateUser($username: String, $password: String) {
    updateUser(username: $username, password: $password) {
      username
    }
  }
`;

export const ADD_CHAT = gql`
  mutation Mutation($tutor: ID) {
    createChat(tutor: $tutor) {
      _id
      tutor {
        username
      }
      student {
        username
      }
      messages {
        _id
        messageText
        from {
          username
        }
        to {
          username
        }
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($chatId: ID!, $messageText: String!) {
    addMessage(chatId: $chatId, messageText: $messageText) {
      _id
      messageText
      from {
        username
      }
      to {
        username
      }
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

export const SINGLE_FILE_UPLOAD = gql`
  mutation SingleUpload($file: Upload!) {
    singleUpload(file: $file) {
      File
    }
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
