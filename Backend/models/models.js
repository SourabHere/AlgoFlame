const mongoose = require('mongoose');
const { INTEGER } = require('sequelize');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const questionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  companies: {
    type: String,
    required: true,
  },
  inputData: {
    type: String,
    required: true,
  },
  outputData: {
    type: String,
    required: true,
  },
  exampleTestCaseInput: {
    type: String,
    required: true,
  },
  exampleTestCaseOutput: {
    type: String,
    required: true,
  },
  testCaseInput: {
    type: Array,
    required: true,
  },
  testCaseOutput: {
    type: Array,
    required: true,
  },
  submissions: {
    type: Number,
    required: true,
  },
  sphereId: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);
const Question = mongoose.model('Question', questionSchema);

module.exports = { User, Question };