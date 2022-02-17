const { gql } = require("apollo-server")
const axios = require("axios")

const typeDefs = gql`
  type User {
    id: ID
    login: String
    avatar_url: String
  }

  type Query {
    users: [User]
  }
`
