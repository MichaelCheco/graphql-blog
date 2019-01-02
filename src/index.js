const { GraphQLServer } = require("graphql-yoga");
const  { prisma } = require('./generated/prisma.graphql')
const Query = require('./resolvers/Query') 
const Mutation = require('./resolvers/Mutation') 
const resolvers = {
    Query,
    Mutation
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
      prisma
    })
})

server.start(() => console.log(`The server is running on http://localhost:4000`))