// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
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
    posts: [Post]
  }

  type Category {
    _id: ID
    name: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(_id: ID!): Post
    categories(name: String): Category
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPost(thoughtText: String!): Post
    addComment(postId: ID!, commentText: String!): Comment

    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    updatePost(_id: ID!, postText: String!): Post
    updateComment(_id: ID!, commentText: String!): Comment
    addCategory(name: String!): Category
  }

  type Auth {
    token: ID!
    user: User
  }
`;

// export the typeDefs
module.exports = typeDefs;
