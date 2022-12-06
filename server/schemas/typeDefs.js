// INSTRUCTIONS FROM README

//  * `typeDefs.js`: Define the necessary `Query` and `Mutation` types:

// 1 * `Query` type:

// 2  * `me`: Which returns a `User` type.
		
// 3 * `Mutation` type:

//     * `login`: Accepts an email and password as parameters; returns an `Auth` type.

//     * `addUser`: Accepts a username, email, and password as parameters; returns an `Auth` type.

//     * `saveBook`: Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a `User` type. (Look into creating what's known as an `input` type to handle all of these parameters!)

//     * `removeBook`: Accepts a book's `bookId` as a parameter; returns a `User` type.
    
// 4 * `User` type:

//     * `_id`

//     * `username`

//     * `email`

//     * `bookCount`

//     * `savedBooks` (This will be an array of the `Book` type.)

// 5 * `Book` type:

//     * `bookId` (Not the `_id`, but the book's `id` value returned from Google's Book API.)

//     * `authors` (An array of strings, as there may be more than one author.)

//     * `description`

//     * `title`

//     * `image`

//     * `link`

// 6 * `Auth` type:

//     * `token`

//     * `user` (References the `User` type.)
