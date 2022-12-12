// INSTRUCTIONS FROM README
// * `server.js`: Implement the Apollo Server and apply it to the Express server as middleware.

// IMPORT EXPRESS
const express = require('express');
// IMPORT THE APOLLO SERVER
const { ApolloServer } = require('apollo-server-express');
// AUTHERNTICATION MIDDLEWARE
const { authMiddleware } = require('./utils/auth');
// IMPORT THE TYPEDEFS AND RESOLVERS
const { typeDefs, resolvers } = require('./schemas');
// GIVEN CODE
const path = require('path');
const db = require('./config/connection');
// NOT USING THESE GIVEN ROUTES
// const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// CREATE NEW APOLLO SERVER (PASS IN TYPEDEFS, RESOLVERS, AND CONTEXT for MIDDLWARE)
// *** I ADDED introspection to test and see if the endpoint will work
// https://www.apollographql.com/blog/graphql/security/why-you-should-disable-graphql-introspection-in-production/
 // introspection: process.env.NODE_ENV !== 'production',
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// URL ENCODED MIDDLEWARE
// app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// *****  ADDED LINES 42-44 FROM THE SOLVED ACTIVITY 26 IN STATE
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// *** COMMENT OUT THE ROUTES THAT WERE GIVEN??? 
// app.use(routes);

// HELP FROM TA - STARTING THE APOLLO SERVER
const startingApolloServer = async (typeDefs, resolvers) =>{
  await server.start();
  // APPLY THE APOLLO SERVER MIDDLEWARE TO THE EXPRESS APP
  server.applyMiddleware({app});
  db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
    // LOG WHERE THE GRAPHQL API IS RUNNING WITH THE APOLLO SERVER (graphqlPath)
    console.log(`Use http://localhost:${PORT}${server.graphqlPath}`);
  });
}
  
  // **** REPLACED THE ABOVE APOLLO SERVER CODE WITH MONGO SERVER 
  // const startingMongoServer = async (typeDefs, resolvers) =>{
  //   await server.start();
  //   // APPLY THE APOLLO SERVER MIDDLEWARE TO THE EXPRESS APP
  //   server.applyMiddleware({app});
  //   // CONNECT TO THE MONGO DB
  // mongoose.connect(
  //   process.env.MONGODB_URI || 'mongodb://localhost:27017/book-search-app', 
  //   {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   },
  // );

startingApolloServer(typeDefs, resolvers);
// REPLACE THE ABOVE APOLLO SERVER CODE WITH MONGO SERVER
// startingMongoServer(typeDefs, resolvers);