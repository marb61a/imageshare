const {ApolloServer, gql} = require("apollo-server");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Imports typeDefs and resolvers
const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");
const resolvers = require("./resolvers");

// Imports models and environmental variables
require("dotenv").config({ path: "variables.env" });
const User = require("./models/User");
const Post = require("./models/Post");

// Connect to the MLab DB
mongoose
  .connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true}
  )
  .then(() => console.log("DB Connected"))
  .catch(err => console.error(err));

// Verify the JWT token passed from the client
const getUser = async token => {
  if(token) {
    try {
      return await jwt.verify(token, process.env.SECRET)
    } catch(err) {
      throw new AuthenticationError(
        "Your session has ended. Please sign in again."
      )
    }
  }
}

// Create Apollo/GraphQL server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post
  }
});

server.listen()
  .then(({url}) => {
    console.log(`Server listening on ${url}`)
  })