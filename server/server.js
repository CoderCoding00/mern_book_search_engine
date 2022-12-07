// INSTRUCTIONS FROM README
// * `server.js`: Implement the Apollo Server and apply it to the Express server as middleware.

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
// DO WE NEED RPUTES?
// const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// CREATE NEW APOLLO SERVER (PASS IN TYPEDEFS, RESOLVERS, AND CONTEXT for MIDDLWARE)
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// APPLY THE APOLLO SERVER MIDDLEWARE TO THE EXPRESS APP


// URL ENCODED MIDDLEWARE
// app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// *** ??? sendFile will serve index.html on the route '/'
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// DO WE NEED ROUTES???
// app.use(routes);

// HELP FROM TA - STARTING THE APOLLO SERVER
const startingApolloServer = async (typeDefs, resolvers) =>{
  await server.start();
  server.applyMiddleware({app});
  
  db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
    // LOG WHERE THE GRAPHQL API IS RUNNING WITH THE APOLLO SERVER (graphqlPath)
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    // console.log(`URL to Run: http://localhost:${PORT}${server.graphqlPath}`);
  });
}
startingApolloServer(typeDefs, resolvers);

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
//   // LOG WHERE THE GRAPHQL API IS RUNNING WITH THE APOLLO SERVER (graphqlPath)
//   console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
//   // console.log(`URL to Run: http://localhost:${PORT}${server.graphqlPath}`);
// });
