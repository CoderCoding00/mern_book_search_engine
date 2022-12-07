
// INSTRUCTIONS FROM README
// * `App.js`: Create an Apollo Provider to make every request work with the Apollo Server.

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// IMPORT APOLLO DEPENDENCIES (ApolloClient, InMemoryCache, ApolloProvider, createHttpLink)
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
// IMPORT THE REACT-ROUTER-DOM DEPENDENCY
import { setContext } from '@apollo/client/link/context';
// IMPORTS FROM PAGES AND COMPONENTS WERE ALREADY GIVEN
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

// CREATE A NEW CONST LINK FOR THE createHttpLink
const link = createHttpLink({
  uri: '/graphql',
});

// CREATE A NEW CONST AUTH LINK FOR THE setContext
const authLink = setContext((_, { headers }) => {
  // GET THE TOKEN 
  const token = localStorage.getItem('id_token');
  // RETURN THE HEADERS
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
// CREATE A NEW CONST CLIENT FOR THE ApolloClient
const client = new ApolloClient({
  // PASS IN THE LINK AND CACHE
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

// REFACTOR THE APP FUNCTION TO WRAP THE ENTIRE APP IN THE ApolloProvider
function App() {
  return (
    // WRAP THE ENTIRE APP IN THE ApolloProvider and use "exact" path
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route 
            exact path='/' 
            element={<SearchBooks />} 
          />
          <Route 
            exact path='/saved' 
            element={<SavedBooks />} 
          />
          {/* CHANGE ROUTE RO RENDER INSTEAD???? */}
          <Route 
            path='*'
            element={<h1 className='display-2'>Wrong page!</h1>}
          />
        </Routes>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
