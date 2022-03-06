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
    chats: [Chat]
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
    createdAt: String
  }

  type Chat {
    _id: ID
    tutor: User
    student: User
    messages: [Message]
    createdAt: String
  }

  type Query {
    me: Me
    users: [User]
    tutors: [Tutor]
    tutor: Tutor
    student(id: ID): Student
    user(username: String!): User
    chat(id: ID!): Chat
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

    updateTutor(
      username: String
      password: String
      hourlyRate: String
      bio: String
      knownSubjects: String
    ): Me

    updateUser(
      firstName: String
      lastName: String
      username: String
      password: String
    ): User

    createChat(tutor: ID): Chat
    addMessage(chatId: ID, messageText: String): Message

    singleUpload(file: Upload!): File
    signedLink(filename: String!): String
  }

  type Auth {
    token: ID!
    user: User
    tutor: Tutor
    student: Student
  }

  type Me {
    tutor: Tutor
    student: Student
    user: User
  }

  type File {
    filename: String
    mimetype: String
    encoding: String
  }
`;

// export the typeDefs
module.exports = typeDefs;
