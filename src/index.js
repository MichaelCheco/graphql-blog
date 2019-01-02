const { GraphQLServer } = require("graphql-yoga");
const  { prisma } = require('./generated/prisma.graphql')
const { resolvers } = require('./resolvers')
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => ({
        ...request,
      prisma
    })
})

server.start(() => console.log(`The server is running on http://localhost:4000`))