// INSTRUCTIONS FROM README
// * Remove the `useEffect()` Hook that sets the state for `UserData`.
// * Instead, use the `useQuery()` Hook to execute the `GET_ME` query on load
// and save it to a variable named `userData`.
// * Use the `useMutation()` Hook to execute the `REMOVE_BOOK` mutation in the `handleDeleteBook()` function instead of the `deleteBook()` function that's imported from `API` file.
// (Make sure you keep the `removeBookId()` function in place!)

import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";
import { GET_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";

const SavedBooks = () => {
  // ADD useQuery HOOK
  const { loading, data } = useQuery(GET_ME);
  // ** ADD useMutation HOOK (SHOULD ERROR BE REMOVED FROM THIS?)
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);
  // ** data?.me CHECKS IF DATA EXISTS, OTHERWISE RETURN AN EMPTY OBJECT
  const userData = data?.me || {};

  // **GIVE CODE BELOW
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    // ** MY CODE TO REFACTOR TRY/CATCH BELOW
    try {
      // ********* DATA IS ASSIGNED TO THE RESPONSE BUT NEVER USED ?????
      const { data } = await removeBook({
        variables: { bookId },
      });
      console.log(data);
      // if(!data) {
      //   throw new Error('Something went wrong!');
      // }
      // *** GIVEN CODE BELOW
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };
  // if data isn't here yet, say so (change to "loading")
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing {userData.username}'s saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks?.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <CardColumns>
          {/* ADDED ? after savedBooks */}
          {userData.savedBooks?.map((book) => {
            return (
              <Card key={book.bookId} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
