const express = require('express');
const usersRouter = require('./routes/users');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount the users router on the /users path
app.use('/users', usersRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
