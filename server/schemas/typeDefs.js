// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  scalar Upload

  type User {
    _id: ID
    username: String
    email: String
    photo: String
    role: String
  }

  type Tutor {
    _id: ID
    userId: User
    hourlyRate: String
    knownSubjects: String
    bio: String
  }

  type Student {
    _id: ID
    userId: User
    paymentInfo: String
    bio: String
  }

  type Message {
    _id: ID
    messageText: String
    from: User
    to: User
  }

  type Chat {
    _id: ID
    tutor: User
    student: User
    messages: [Message]
  }

  type Query {
    me: User
    users: [User]
    tutors: [Tutor]
    user(username: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth

    addUser(
      firstName: String!
      lastName: String!
      role: String!
      username: String!
      email: String!
      password: String!
    ): Auth

    addTutor(
      firstName: String
      lastName: String
      role: String
      username: String!
      email: String!
      photo: String
      password: String!
      hourlyRate: String
      knownSubjects: String
      bio: String
    ): Auth

    addStudent(
      firstName: String
      lastName: String
      role: String
      username: String!
      email: String!
      photo: String
      password: String!
      paymentInfo: String
      bio: String
    ): Auth

    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User

    createChat(tutor: ID, student: ID): Chat
    addMessage(chatId: ID, messageText: String): Message

    singleUpload(file: Upload!): File
  }

  type Auth {
    token: ID!
    user: User
    tutor: Tutor
    student: Student
  }

  type File {
    filename: String
    mimetype: String
    encoding: String
  }
`;

// export the typeDefs
module.exports = typeDefs;
