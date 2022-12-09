const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb+srv://holliday:M0ng02022@cluster0.aekejmm.mongodb.net/book-search-app?retryWrites=true&w=majority',
    {   
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    },
  );

module.exports = mongoose.connection;
