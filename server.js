const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const https = require('https');
const http = require('http');

const app = express();
const HTTP_PORT = 80;
const HTTPS_PORT = 443;
const DEV_PORT = 3000;
const FEEDBACK_FILE = path.join(__dirname, 'feedback.json');
const USERS_FILE = path.join(__dirname, 'users.json');
const NEWS_FILE = path.join(__dirname, 'public/data/news.json');

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
  // Admin credentials
  const ADMIN_USER = 'admin123';
  const ADMIN_PASS = 'admin123';

  // Check admin user
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.json({ success: true, message: 'Admin login successful', isAdmin: true });
  }

  // Check hardcoded user
  if (username === USER && password === PASS) {
    return res.json({ success: true, message: 'Login successful', isAdmin: false });
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
    return res.json({ success: true, message: 'Login successful', isAdmin: false });
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

// Get all news articles
app.get('/api/news', (req, res) => {
  let news = [];
  if (fs.existsSync(NEWS_FILE)) {
    try {
      news = JSON.parse(fs.readFileSync(NEWS_FILE, 'utf8'));
    } catch (e) {
      news = [];
    }
  }
  res.json(news);
});

// Add a new news article (no admin required)
app.post('/api/news', (req, res) => {
  const { title, content, date } = req.body;
  if (!title || !content) {
    return res.status(400).json({ success: false, message: 'Title and content are required.' });
  }
  let news = [];
  if (fs.existsSync(NEWS_FILE)) {
    try {
      news = JSON.parse(fs.readFileSync(NEWS_FILE, 'utf8'));
    } catch (e) {
      news = [];
    }
  }
  const newArticle = {
    title: title.trim(),
    content: content.trim(),
    date: date || new Date().toISOString()
  };
  news.unshift(newArticle); // Add to top
  fs.writeFileSync(NEWS_FILE, JSON.stringify(news, null, 2), 'utf8');
  res.json({ success: true, article: newArticle });
});

app.get('/settings', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/settings.html'));
});

app.get('/learn-article1', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/learn-article1.html'));
});

app.get('/learn-article2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/learn-article2.html'));
});

try {
  // Production setup with SSL
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/kaged.org/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/kaged.org/fullchain.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(HTTPS_PORT, '0.0.0.0', () => {
    console.log(`HTTPS Server running at https://localhost:${HTTPS_PORT}`);
  });

  // Redirect HTTP to HTTPS
  const httpServer = http.createServer((req, res) => {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
  });
  httpServer.listen(HTTP_PORT, '0.0.0.0', () => {
    console.log(`HTTP Server running and redirecting to HTTPS on port ${HTTP_PORT}`);
  });

} catch (e) {
  // Development fallback without SSL
  console.log('Could not find SSL certificates, starting HTTP server for development on port ' + DEV_PORT);
  app.listen(DEV_PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${DEV_PORT}`);
  });
}
