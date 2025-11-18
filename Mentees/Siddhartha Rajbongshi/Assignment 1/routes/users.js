const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const DATA_FILE = path.join(__dirname, '..', 'users.json');

// GET /users - Return all users as an array
router.get('/', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading user data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    try {
      const users = JSON.parse(data);
      return res.json(users);
    } catch (parseErr) {
      console.error('Error parsing user data:', parseErr);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// POST /users - Add a new user with incremental id
router.post('/', (req, res) => {
  const { name, email } = req.body;

  // Input validation: name and email are required
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  // Simple email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Read existing users from the file
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading user data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    let users = [];
    try {
      users = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error parsing user data:', parseErr);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Determine new ID (incremental)
    const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
    const newUser = { id: maxId + 1, name: name, email: email };
    users.push(newUser);

    // Write updated users array back to the file
    fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error('Error writing user data:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      return res.status(201).json({ message: 'User added successfully', user: newUser });
    });
  });
});

module.exports = router;
