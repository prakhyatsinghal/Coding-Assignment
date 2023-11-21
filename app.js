// app.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const QuestionPaperGenerator = require('./app/services/QuestionPaperGenerator');

// Body parser middleware to parse JSON
app.use(bodyParser.json());

// Create an instance of QuestionPaperGenerator
const questionPaperGenerator = new QuestionPaperGenerator();

// API endpoint to generate a question paper
app.post('/api/generate-question-paper', (req, res) => {
  try {
    const { totalMarks, difficultyDistribution } = req.body;

    // Generate question paper
    const questionPaper = questionPaperGenerator.generateQuestionPaper(totalMarks, difficultyDistribution);

    // Calculate total marks
    const totalMarksGenerated = questionPaper.reduce((total, question) => total + question.marks, 0);

    console.log('Total Marks Generated:', totalMarksGenerated);

    res.json({ success: true, questionPaper, totalMarksGenerated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});