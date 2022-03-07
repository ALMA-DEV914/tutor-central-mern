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
      student {
        _id
        userId {
          _id
          username
          email
          photo
          role
        }
        bio
        paymentInfo
      }
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
            username
          }
          student {
            _id
            username
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

export const QUERY_TUTOR = gql`
  query Tutor($userId: ID) {
    tutor(id: $userId) {
      _id
      bio
      knownSubjects
      hourlyRate
      userId {
        username
        email
        photo
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
