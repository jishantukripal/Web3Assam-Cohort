const express = require('express')
const fs = require('fs').promises
const path = require('path')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const DATA_FILE = path.join(__dirname, 'users.json')

async function readUsers() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8')
    return JSON.parse(data || '[]')
  } catch (e) {
    if (e.code === 'ENOENT') return []
    throw e
  }
}

async function writeUsers(users) {
  await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), 'utf8')
}

app.get('/users', async (req, res) => {
  try {
    const users = await readUsers()
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: 'Failed to read users' })
  }
})

app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body
    if (!name || !email) {
      return res.status(400).json({ error: 'name and email are required' })
    }
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'invalid email format' })
    }
    const users = await readUsers()
    const maxId = users.reduce((m, u) => Math.max(m, u.id || 0), 0)
    const newUser = { id: maxId + 1, name, email }
    users.push(newUser)
    await writeUsers(users)
    res.status(201).json({ success: true, user: newUser })
  } catch (err) {
    res.status(500).json({ error: 'Failed to add user' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
