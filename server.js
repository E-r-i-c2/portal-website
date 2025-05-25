const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const FEEDBACK_FILE = path.join(__dirname, 'feedback.json');

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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
