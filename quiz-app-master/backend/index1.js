require('dotenv').config(); // Loads .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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

// Example: Define a schema and model
const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String
});
const Question = mongoose.model('Question', questionSchema);

// Example: Get all questions
app.get('/api/questions', async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

// Example: Add a question
app.post('/api/questions', async (req, res) => {
  const newQuestion = new Question(req.body);
  await newQuestion.save();
  res.status(201).json(newQuestion);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
