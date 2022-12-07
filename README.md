# MERN: Book Search Engine

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Project Description

This is an application using using Google Books API search engine built with a RESTful API, and refactored to be a GraphQL API built with Apollo Server. The app was built using the MERN stack with a React front end, MongoDB database, and Node.js/Express.js server and API. Users can save book searches to the back end. 

## Table of Contents

- [MERN: Book Search Engine](#mern-book-search-engine)
	- [Project Description](#project-description)
	- [Table of Contents](#table-of-contents)
	- [User Story](#user-story)
	- [Animated Functionality](#animated-functionality)
	- [Terminal Command To Run The Application](#terminal-command-to-run-the-application)
	- [Deployment](#deployment)
		- [Heroku Link](#heroku-link)
		- [Github Link](#github-link)

## User Story

```md
A user can search for new books to read
and keep a list of books to purchase. Users 
can search books, save books, and delete books
from their book list.
```


## Animated Functionality

The following animation shows how a user can type a search term such as "star wars" in a search box and the results appear:

![Animation shows "star wars" typed into a search box and books about Star Wars appearing as results.](./Assets/21-mern-homework-demo-01.gif)

The user can save books by clicking "Save This Book!" under each search result, as shown in the following animation:

![Animation shows user clicking "Save This Book!" button to save books that appear in search results. The button label changes to "Book Already Saved" after it is clicked and the book is saved.](./Assets/21-mern-homework-demo-02.gif)

A user can view their saved books on a separate page, as shown in the following animation:

![The Viewing Lernantino's Books page shows the books that the user Lernaninto has saved.](./Assets/21-mern-homework-demo-03.gif)

## Terminal Command To Run The Application 

`npm run develop`

Builds the application. The front end (client side) runs on [http://localhost:3000] in your browser. The back end (server side) runs on [http://localhost:3001/graphql] where you can query the server. 

## Deployment
This application was deployed on Heroku. The link is provided below along with the github repository. 

### Heroku Link

### Github Link
https://github.com/CoderCoding00/mern_book_search_engine


