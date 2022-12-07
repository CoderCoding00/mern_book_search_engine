// INSTRUCTIONS FROM README
// * `resolvers.js`: Define the query and mutation functionality to work with the Mongoose models.
// **** Hint ****: Use the functionality in the `user-controller.js` as a guide.

// import the user model
const { User } = require('../models');
// import the authentication middleware
const { signToken } = require('../utils/auth');
// import the authentication middleware
const { AuthenticationError } = require('apollo-server-express');

// DEFINE THE RESOLVERS
const resolvers = {
    // DEFINE THE QUERY
    Query: {
        // ME QUERY TO GET THE USER BY ID
        me: async (parent, args, context) => {
            // IF THERE IS A USER CONTEXT
            if (context.user) {
                // FIND THE USER BY THE ID
                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
                // OR IS THE OBJECT EMPTY INSTEAD OF _id?
                // const userData = await User.findOne({ })
                    // .select('-__v -password');
                    // *** ASK ABOUT .populate('books');
                    // .populate('books');

                // RETURN THE USER DATA
                return userData;
            }
            // THROW AN ERROR 
            throw new AuthenticationError('ERROR: You need to log in!');
        }
    },
    // DEFINE THE MUTATION
    Mutation: {
        // MUTATION FOR THE ADD USER
        addUser: async (parent, args) => {
            // CREATE THE USER
            const user = await User.create(args);
            // SIGN THE TOKEN
            const token = signToken(user);
            // RETURN THE TOKEN
            return { token, user };
        },
        // MUTATION FOR THE LOGIN
        login: async (parent, { email, password }) => {
            // FIND THE USER BY THE EMAIL
            const user = await User.findOne({ email })

                // IF THERE IS NO USER
                if (!user) {
                    // THROW AN ERROR
                    throw new AuthenticationError('ERROR: No user with this email!');
                }
                // CHECK THE PASSWORD
                const correctPw = await user.isCorrectPassword(password);
                // IF THE PASSWORD IS INCORRECT
                if (!correctPw) {
                    // THROW AN ERROR
                    throw new AuthenticationError('ERROR: Incorrect password!');
                }
                // SIGN THE TOKEN
                const token = signToken(user);
                // RETURN THE TOKEN
                return { token, user };
        },
        // MUTATION FOR THE SAVE BOOK
        saveBook: async (parent, { bookData }, context) => {
            // IF THERE IS A USER CONTEXT
            if (context.user) {
                // FIND THE USER
                const updatedUser = await User.findOneAndUpdate(
                    // FIND THE USER BY THE ID
                    { _id: context.user._id },
                    // ADD THE BOOK
                    { $addToSet: { savedBooks: bookData } },
                    // RETURN THE NEW DATA
                    { new: true }
                );
                // RETURN THE UPDATED USER
                return updatedUser;
            }
            throw new AuthenticationError('ERROR: Please log in.');
        },

        // MUTATION FOR THE REMOVE BOOK
        removeBook: async (parent, { bookId }, context) => {
            // IF THERE IS A USER CONTEXT
            if (context.user) {
                // FIND THE USER
                const updatedUser = await User.findOneAndUpdate(
                    // FIND THE USER BY THE ID
                    { _id: context.user._id },
                    // REMOVE THE BOOK
                    // { $pull: { savedBooks: { bookId: bookId } } },
                    { $pull: { savedBooks: { bookId } } },
                    // RETURN THE NEW DATA
                    { new: true }
                );
                // RETURN THE UPDATED USER
                return updatedUser;
            }
            throw new AuthenticationError('ERROR: Please log in.');
        }
    }
};

// EXPORT THE RESOLVERS
module.exports = resolvers;