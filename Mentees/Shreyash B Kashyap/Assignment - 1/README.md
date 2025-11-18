## **How to Run the Server**

### **1. Install Dependencies**

Run the following command inside the project directory:

```
npm install
```

### **2. Start the Server**

**Normal mode:**

```
node server.js
```

**Development mode with auto-reload (optional):**

```
npm run dev
```

### **3. Default Port**

The server runs on:

```
http://localhost:3000
```

You can change the port by setting the environment variable:

```
PORT=4000 node server.js
```

---

## **API Endpoints**

### **1. GET /users**

Retrieve all stored users.

**Example request:**

```
curl http://localhost:3000/users
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "Bob",
    "email": "bob@gmail.com"
  }
]
```

---

### **2. POST /users**

Add a new user with `name` and `email`.

**Required fields:**

- `name`
    
- `email`
    

**Example (Windows CMD):**

```
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d "{ \"name\": \"Alice\", \"email\": \"alice@mail.com\" }"
```

**Example (PowerShell / Git Bash):**

```
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{ "name": "Alice", "email": "alice@mail.com" }'
```

---

## **Optional Enhancements Implemented**

- Input validation for name and email
    
- Email format checking using a regex
    
- Auto-incrementing user IDs based on existing data
    
- Graceful handling when `users.json` does not yet exist
    
- Basic error handling for file read/write issues
    
- Cross-origin support enabled via CORS