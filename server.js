const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const FEEDBACK_FILE = path.join(__dirname, 'feedback.json');
const USERS_FILE = path.join(__dirname, 'users.json');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

// Handle feedback submission
app.post('/submit-feedback', (req, res) => {
  const { feedback } = req.body;
  if (!feedback || typeof feedback !== 'string' || !feedback.trim()) {
    return res.status(400).json({ error: 'Invalid feedback' });
  }

  // Read existing feedbacks
  let feedbacks = [];
  if (fs.existsSync(FEEDBACK_FILE)) {
    try {
      feedbacks = JSON.parse(fs.readFileSync(FEEDBACK_FILE, 'utf8'));
    } catch (e) {
      feedbacks = [];
    }
  }

  // Add new feedback with timestamp
  feedbacks.push({
    feedback: feedback.trim(),
    date: new Date().toISOString()
  });

  // Write back to file
  fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedbacks, null, 2), 'utf8');
  res.json({ success: true });
});

// (Optional) Endpoint to view all feedbacks
app.get('/feedbacks', (req, res) => {
  if (fs.existsSync(FEEDBACK_FILE)) {
    const feedbacks = JSON.parse(fs.readFileSync(FEEDBACK_FILE, 'utf8'));
    res.json(feedbacks);
  } else {
    res.json([]);
  }
});

// Simple login endpoint (hardcoded user)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Hardcoded credentials (for demo)
  const USER = 'admin';
  const PASS = 'password123';

  // Check hardcoded user
  if (username === USER && password === PASS) {
    return res.json({ success: true, message: 'Login successful' });
  }

  // Check registered users
  let users = [];
  if (fs.existsSync(USERS_FILE)) {
    try {
      users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    } catch (e) {
      users = [];
    }
  }
  if (users.find(u => u.username === username && u.password === password)) {
    return res.json({ success: true, message: 'Login successful' });
  }

  res.status(401).json({ success: false, message: 'Invalid username or password' });
});

// Sign up endpoint
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }
  let users = [];
  if (fs.existsSync(USERS_FILE)) {
    try {
      users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    } catch (e) {
      users = [];
    }
  }
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ success: false, message: 'Username already exists.' });
  }
  users.push({ username, password });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
  res.json({ success: true, message: 'Sign up successful!' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/index.html'));
});
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/about.html'));
});
app.get('/learn', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/learn.html'));
});
app.get('/news', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/news.html'));
});
app.get('/support', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/support.html'));
});
app.get('/careers', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/careers.html'));
});
app.get('/game1', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/game1.html'));
});
app.get('/game2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/game2.html'));
});
app.get('/game3', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/game3.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
