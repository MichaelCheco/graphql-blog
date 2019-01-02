const { GraphQLServer } = require("graphql-yoga");



const resolvers = {
  Query: {
    description: () => `This is the API of a blogging application`
  }
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})

server.start(() => console.log(`The server is running on http://localhost:4000`))