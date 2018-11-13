const {ApolloServer, gql} = require("apollo-server");
const mongoose = require("mongoose");

require("dotenv").config({ path: "variables.env" });
const User = require("./models/User");
const Post = require("./models/Post");

mongoose
  .connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true}
  )
  .then(() => console.log("DB Connected"))
  .catch(err => console.error(err));

const server = new ApolloServer({
  typeDefs,
  context: {
    User,
    Post
  }
});

server.listen()
  .then(({url}) => {
    console.log(`Server listening on ${url}`)
  })