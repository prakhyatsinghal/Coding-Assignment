# Question Paper Generator

The Question Paper Generator is a Node.js application that facilitates the generation of question papers based on specified criteria such as total marks and difficulty distribution. The application is designed to handle various edge cases and provides meaningful logs for error tracking.

## Table of Contents

- [Overview](#overview)
- [Components](#components)
  - [1. `data/questionStore.js`](#1-dataquestionstorejs)
  - [2. `models/question.js`](#2-modelsquestionjs)
  - [3. `services/questionPaperGenerator.js`](#3-servicesquestionpapergeneratorjs)
  - [4. `app.js`](#4-appjs)
- [Usage](#usage)


## Overview

The Question Paper Generator is a Node.js application that generates a question paper based on specified criteria such as total marks and difficulty distribution. The application is designed to handle various edge cases and provides meaningful logs for error tracking.

## Components

### 1. `data/questionStore.js`

This module loads a set of questions from a JSON file (`sampleData.json`) and exports them for use in the Question Paper Generator.

### 2. `models/question.js`

Defines the `Question` class, representing a question with properties like question text, subject, topic, difficulty, and marks.

### 3. `services/questionPaperGenerator.js`

The core module responsible for generating a question paper. It includes the following key methods:

- #### `constructor()`
  Initializes the QuestionPaperGenerator instance with the loaded question store.

- #### `generateQuestionPaper(totalMarks, distribution)`
  Generates a question paper based on the provided total marks and difficulty distribution. Handles various edge cases and logs meaningful messages for error tracking.

- #### `getAverageMarks(questions)`
  Calculates and returns the average marks for a set of questions.

- #### `filterQuestionsByDifficulty(difficulty)`
  Filters questions based on the provided difficulty.

- #### `getRandomQuestions(questions, count)`
  Randomly selects a specified number of questions from the given array.

### 4. `app.js`

The main entry point of the application, utilizing Express.js to create an API endpoint for generating question papers. The application follows best practices for error handling and logging.

## Usage

1. **Installation:**
   - Clone the repository: `git clone https://github.com/prakhyatsinghal/Coding-Assignment`
   - Install dependencies: `npm install`

2. **Run the Application:**
   - Start the application: `node app.js`

3. **API Endpoint:**
   - POST `http://localhost:3000/api/generate-question-paper`
   - Body should include `totalMarks` and `difficultyDistribution` parameters.

4. **Example Request:**
   ```json
   {
     "totalMarks": 100,
     "difficultyDistribution": {
       "easy": 20,
       "medium": 50,
       "hard": 30
     }
   }


