// data/questionStore.js
const fs = require('fs');
const path = require('path');

// Load question data from sampleData.json
const dataPath = path.join(__dirname, 'sampleData.json');
const questionStore = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

module.exports = questionStore;