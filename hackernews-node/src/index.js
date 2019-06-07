const { GraphQLServer } = require('graphql-yoga')

// Definition of graphql schema with allowable fields
// The bang (!) at the end of the type definition denotes a required field
const typeDefs = `
type Query {
    info: String!
}
`

// Implementation of the graphql schema, structured the same as the schema
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`
    }
}

// Bundling of the schema and resolvers for the server to implement
const server = new GraphQLServer({
    typeDefs,
    resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))