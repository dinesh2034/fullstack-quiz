const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Score schema and model
const scoreSchema = new mongoose.Schema({
  username: String,
  score: Number,
  totalQuestions: Number,
  date: { type: Date, default: Date.now }
});
const Score = mongoose.model('Score', scoreSchema);

// POST endpoint to save quiz result
app.post('/api/scores', async (req, res) => {
  try {
    const newScore = new Score(req.body);
    await newScore.save();
    res.status(201).json(newScore);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// (Optional) GET endpoint to fetch all scores
app.get('/api/scores', async (req, res) => {
  try {
    const scores = await Score.find();
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));