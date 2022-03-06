import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
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
  query me {
    me {
      tutor {
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
      user {
        _id
        username
        email
        photo
        role
        chats {
          _id
          tutor {
            _id
          }
          student {
            _id
          }
          createdAt
          messages {
            _id
          }
        }
      }
    }
  }
`;

export const QUERY_CHAT = gql`
  query Chat($chatId: ID!) {
    chat(id: $chatId) {
      _id
      createdAt
      tutor {
        username
        _id
      }
      student {
        username
        _id
      }
      messages {
        _id
        createdAt
        to {
          _id
        }
        from {
          _id
        }
        messageText
      }
    }
  }
`;
export const GET_BETA_FEEDBACK = gql`
  query BetaFeedback {
    betaFeedback(sortBy: { field: "createdAt", order: DESC }) {
      _id
      username
      email
      message
      image
      createdAt
      archived
    }
  }
`;
