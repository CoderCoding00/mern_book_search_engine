// INSTRUCTIONS FROM README
// * `queries.js`: This will hold the query `GET_ME`, which will execute the `me` query set up using Apollo Server.

// IMPORT THE gql METHOD FROM APOLLO SERVER
import { gql } from '@apollo/client';

// EXPORT CONST GET_ME QUERY 
export const GET_ME = gql`
   {
        me {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;
