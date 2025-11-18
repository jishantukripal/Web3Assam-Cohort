# Assignment 1: User Management API

This project implements a simple Node.js and Express backend to manage user data stored in a local `users.json` file. It provides two endpoints:

- **GET /users:** Returns all users as a JSON array.
- **POST /users:** Accepts a JSON object with `name` and `email`, adds a new user with an incremental `id`, and returns a success response.

## Setup Instructions

1. **Prerequisites:** Ensure [Node.js](https://nodejs.org/) is installed on your system.
2. **Directory:** Navigate to the `Assignment 1` project directory.
3. **Install dependencies:** Run `npm install` to install the required packages (as specified in `package.json`).
4. **Start the server:** Run `npm start`. The server will start on port 3000 by default.
5. **Testing the API:**
   - Use tools like **Postman** or `curl` to test the endpoints.
   - **GET /users**  
     ```
     curl http://localhost:3000/users
     ```
     This should return the current list of users (initially an empty array).
   - **POST /users**  
     ```
     curl -X POST http://localhost:3000/users \
       -H "Content-Type: application/json" \
       -d '{"name": "John Doe", "email": "john@example.com"}'
     ```
     This will add a new user and return a success message with the created user object.

## Validation & Error Handling

- Both `name` and `email` fields are required for POST requests. If missing or empty, the server responds with a 400 status and an error message.
- The `email` must be in a valid format. Invalid email formats also return a 400 error.
- All internal errors (e.g., file read/write issues) result in a 500 status with an appropriate error message.
