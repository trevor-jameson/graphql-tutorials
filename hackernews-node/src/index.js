const { GraphQLServer } = require('graphql-yoga')

// Resolver function for links array
const links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

// Implementation of the graphql schema, structured the same as the schema
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
    },

    Mutation: {
        postLink: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link)
            return link
        },
        updateLink: (parent, args) => {
            const linkIndex = links.findIndex(link => link.id === args.id)
            links[linkIndex].description = args.description || links[linkIndex].description
            links[linkIndex].url = args.url || links[linkIndex].url
            return links[linkIndex]
        },
        deleteLink: (parent, args) => {
            const linkIndex = links.findIndex(link => link.id === args.id)
            debugger
            return links.splice(linkIndex, 1)
        }
    },
}



// Bundling of the schema and resolvers for the server to implement
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))