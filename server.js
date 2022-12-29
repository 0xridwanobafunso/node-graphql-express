const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    users: [User], 
    user(id: Int!): User
  }, 
  type User {
    id: Int,
    firstname: String
  } 
`)

// The root provides a resolver function for each API endpoint
var root = {
  users: () => {
    return [
      {
        id: 1,
        firstname: 'Lateef',
      },
      {
        id: 2,
        firstname: 'Shola',
      },
    ]
  },
  user: (req) => {
    // console.log(req)
    return {
      id: req.id,
      firstname: 'Obafunso',
    }
  },
}

var app = express()

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)

app.listen(
  4000,
  console.log('Running a GraphQL API server at http://localhost:4000/graphql')
)
