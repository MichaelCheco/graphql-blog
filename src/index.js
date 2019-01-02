const { GraphQLServer } = require("graphql-yoga");

let idCount = 0;
const posts = []

const resolvers = {
  Query: {
    description: () => `This is the API of a blogging application`,
    posts: () => posts,
    post: (parent, args) => posts.find(post => post.id === args.id)
  },
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})

server.start(() => console.log(`The server is running on http://localhost:4000`))