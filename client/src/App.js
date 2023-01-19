// Create an Apollo Provider to make every request work with the Apollo Server.

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// IMPORT APOLLO DEPENDENCIES (ApolloClient, InMemoryCache, ApolloProvider, createHttpLink)
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
// IMPORT THE REACT-ROUTER-DOM DEPENDENCY
import { setContext } from "@apollo/client/link/context";
// IMPORTS FROM PAGES
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
import Navbar from "./components/Navbar";

// CONSTRUCT THE MAIN GRAPHQL API ENDPOINT
const httpLink = createHttpLink({
  uri: "/graphql",
});

// CONSTRUCT REQUEST MIDDLEWARE THAT WILL ATTTACH THE JWT TOKEN TO EVERY REQUEST AS AN AUTHORIZATION HEADER
const authLink = setContext((_, { headers }) => {
  // GET THE TOKEN FROM LOCAL STORAGE IF IT EXISTS
  const token = localStorage.getItem("id_token");
  // RETURN THE HEADERS TO THE CONTEXT SO HTTP LINK CAN READ THEM
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// CREATE A NEW CONST CLIENT FOR THE ApolloClient
const client = new ApolloClient({
  // PASS IN THE LINK AND CACHE
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    // WRAP THE ENTIRE APP IN THE ApolloProvider
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            {/* use "exact" path (OR JUST USE PATH?) */}
            <Route exact path="/" element={<SearchBooks />} />
            <Route exact path="/saved" element={<SavedBooks />} />
            {/* CHANGE ROUTE RO RENDER INSTEAD???? */}
            <Route
              path="*"
              element={<h1 className="display-2">Wrong page!</h1>}
            />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
