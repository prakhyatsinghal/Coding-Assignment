// services/questionPaperGenerator.js
const questionStore = require('../data/questionStore');

class QuestionPaperGenerator {
  constructor() {
    this.questionStore = questionStore;
  }

  /**
   * Generates a question paper based on the provided total marks and difficulty distribution.
   * @param {number} totalMarks - The total marks for the question paper.
   * @param {Object} distribution - The difficulty distribution of the questions.
   * @returns {Array} - An array of questions in the question paper.
   */
  generateQuestionPaper(totalMarks, distribution) {
    const questionPaper = [];
    let remainingMarks = totalMarks;
  
    try {
      // Validate that the difficulty distribution percentages sum up to 100
      const totalPercentage = Object.values(distribution).reduce((sum, percentage) => sum + percentage, 0);
      if (totalPercentage !== 100) {
        throw new Error('Invalid difficulty distribution percentages. Please ensure they sum up to 100.');
      }
  
      const totalQuestions = this.questionStore.length;
      if (totalQuestions === 0) {
        console.warn('No questions available in the question store.');
        return questionPaper;
      }
  
      for (const [difficulty, percentage] of Object.entries(distribution)) {
        const difficultyQuestions = this.filterQuestionsByDifficulty(difficulty);
  
        if (difficultyQuestions.length === 0) {
          console.warn(`No questions found for difficulty: ${difficulty}`);
          continue;
        }
  
        const averageMarks = this.getAverageMarks(difficultyQuestions);
        const numQuestions = Math.ceil((percentage / 100) * totalMarks / averageMarks);
  
        // Ensure the number of questions does not exceed the available questions for the difficulty
        const actualNumQuestions = Math.min(numQuestions, difficultyQuestions.length);
  
        // Calculate the actual marks for the questions
        const actualMarks = actualNumQuestions * averageMarks;
  
        // Adjust the marks of each question based on the remaining marks
        const adjustedMarks = Math.min(remainingMarks, actualMarks);
        const adjustedAverageMarks = adjustedMarks / actualNumQuestions;
  
        questionPaper.push(...this.getRandomQuestions(difficultyQuestions, actualNumQuestions, adjustedAverageMarks));
  
        // Adjust the remaining marks
        remainingMarks -= adjustedMarks;
  
        // Exit the loop if all marks are used
        if (remainingMarks <= 0) break;
      }
  
      // Validate that the total marks generated exactly match the specified totalMarks
      const totalMarksGenerated = questionPaper.reduce((sum, question) => sum + question.marks, 0);
      if (totalMarksGenerated !== totalMarks) {
        throw new Error('Total marks generated do not match the specified totalMarks.');
      }
  
      return questionPaper;
    } catch (error) {
      console.error('Error generating question paper:', error.message);
      throw new Error('Failed to generate question paper');
    }
  }
  
  /**
   * Calculates the average marks for a set of questions.
   * @param {Array} questions - The array of questions.
   * @returns {number} - The average marks.
   */
  getAverageMarks(questions) {
    const totalMarks = questions.reduce((sum, question) => sum + question.marks, 0);
    return totalMarks / questions.length;
  }

  /**
   * Filters questions based on the provided difficulty.
   * @param {string} difficulty - The difficulty level (easy, medium, or hard).
   * @returns {Array} - An array of questions with the specified difficulty.
   */
  filterQuestionsByDifficulty(difficulty) {
    const lowerCaseDifficulty = difficulty.toLowerCase();
    return this.questionStore.filter(question => question.difficulty.toLowerCase() === lowerCaseDifficulty);
  }

  /**
   * Randomly selects a specified number of questions from the given array.
   * @param {Array} questions - The array of questions to select from.
   * @param {number} count - The number of questions to select.
   * @returns {Array} - An array of randomly selected questions.
   */
  getRandomQuestions(questions, count) {
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    return shuffledQuestions.slice(0, count);
  }
}

module.exports = QuestionPaperGenerator;