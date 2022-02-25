// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  scalar Upload

  type Post {
    _id: ID
    postText: String
    createdAt: String
    username: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
    username: String
  }

  type User {
    _id: ID
    username: String
    email: String
    role: String
    posts: [Post]
  }

  type Tutor {
    _id: ID
    hourlyRate: String
    knownSubjects: String
    bio: String
  }
  type Student {
    _id: ID
    paymentInfo: String
    bio: String
  }

  type Category {
    _id: ID
    name: String
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
    tutors: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(_id: ID!): Post
    categories(name: String): Category
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
    addPost(thoughtText: String!): Post
    addComment(postId: ID!, commentText: String!): Comment

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
      firstName: String!
      lastName: String!
      role: String!
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
    updatePost(_id: ID!, postText: String!): Post
    updateComment(_id: ID!, commentText: String!): Comment
    addCategory(name: String!): Category

    createChat(tutor: ID, student: ID): Chat
    addMessage(chatId: ID, messageText: String): Message

    singleUpload(file: Upload!): File!
  }

  type Auth {
    token: ID!
    user: User
    tutor: Tutor
    student: Student
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
`;

// export the typeDefs
module.exports = typeDefs;
