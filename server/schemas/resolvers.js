// import the authentication middleware
const { AuthenticationError } = require("apollo-server-express");
// import the user model
const { User } = require("../models");
// import the authentication middleware
const { signToken } = require("../utils/auth");

// DEFINE THE RESOLVERS
const resolvers = {
  // DEFINE THE QUERY
  Query: {
    // ME QUERY TO GET THE USER BY ID
    me: async (parent, args, context) => {
      // IF THERE IS A USER CONTEXT - FIND THE USER BY THE ID
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        // RETURN THE USER DATA
        return userData;
      }
      // THROW AN ERROR IF THERE IS NO USER CONTEXT
      throw new AuthenticationError("ERROR: You are not logged in!");
    },
  },
  // DEFINE THE MUTATION FOR ADDING A USER
  Mutation: {
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
      const user = await User.findOne({ email });

      // IF THERE IS NO USER THROW AN ERROR
      if (!user) {
        throw new AuthenticationError("ERROR: No user with this email!");
      }
      // CHECK THE PASSWORD
      const correctPw = await user.isCorrectPassword(password);
      // IF THE PASSWORD IS INCORRECT THROW AN ERROR
      if (!correctPw) {
        throw new AuthenticationError("ERROR: Incorrect password!");
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
        // FIND THE USER BY THE ID
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          // ADD THE BOOK
          //   { $addToSet: { savedBooks: bookData } },
          // ALTERNATE WAY To addToSet is to Push the query to the savedBooks array
          { $push: { savedBooks: bookData } },

          // RETURN THE NEW DATA
          { new: true }
        );
        // RETURN THE UPDATED USER
        return updatedUser;
      }
      throw new AuthenticationError("ERROR: Please log in.");
    },

    // MUTATION FOR THE REMOVE BOOK
    removeBook: async (parent, { bookId }, context) => {
      // IF THERE IS A USER CONTEXT - FIND THE USER BY THE ID
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          // Pull the book from the savedBooks array
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        // RETURN THE UPDATED USER
        return updatedUser;
      }
      // THROW AN ERROR IF THERE IS NO USER CONTEXT
      throw new AuthenticationError("ERROR: Please log in.");
    },
  },
};

module.exports = resolvers;
