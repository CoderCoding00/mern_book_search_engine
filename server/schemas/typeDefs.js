// INSTRUCTIONS FROM README

//  * `typeDefs.js`: Define the necessary `Query` and `Mutation` types:

// 1 * `Query` type:
        //  * `me`: Which returns a `User` type.
		
// 3 * `Mutation` type:
    //  * `login`: Accepts an email and password as parameters; returns an `Auth` type.
    //  * `addUser`: Accepts a username, email, and password as parameters; returns an `Auth` type.
    //  * `saveBook`: Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a `User` type. (Look into creating what's known as an `input` type to handle all of these parameters!)
    // * `removeBook`: Accepts a book's `bookId` as a parameter; returns a `User` type.
    
// 4 * `User` type:
    //  * `_id`
    //  * `username`
    //  * `email`
    //  * `bookCount`
    //  * `savedBooks` (This will be an array of the `Book` type.)

// 5 * `Book` type:
    // ASK ??  **** `bookId` (Not the `_id`, but the book's `id` value returned from Google's Book API.)
    // ASK ?? **** `authors` (An array of strings, as there may be more than one author.)
    //  * `description`
    //  * `title`
    //  * `image`
    //  * `link`

// 6 * `Auth` type:
//  * `token`
//  * `user` (References the `User` type.)


// IMPORT THE GQL FROM APOLLO SERVER
const { gql } = require('apollo-server-express');

// DEFINE THE TYPEDEFS
const typeDefs = gql`

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(authors: [String], description: String!, title: String!, bookId: String!, image: String!, link: String!): User
        removeBook(bookId: String!): User
    }

    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }
`;

// EXPORT THE TYPEDEFS
module.exports = typeDefs;
