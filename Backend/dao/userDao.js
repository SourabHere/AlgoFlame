const { User, Question } = require('../models/models');
const loginModel = require("../validations/login");
const validate = require("../utils/validate")

const userDao = {
    createUser: async(userData) => {
        try {
            const newUser = new User(userData);
            await newUser.save();
            
            return {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            };
          } catch (err) {
            console.log(err);
          }
    },

    addQuestion: async(questionData) => {
        try {
            const newQuestion = new Question(questionData);
            await newQuestion.save();

            return newQuestion;

          } catch (err) {
            console.log(err);
          }
    },


    getQuestionById: async (sphereId) => {
        const ques = await Question.findOne({sphereId});

        return ques;
    },

    updateQuestion: async (newData,id) => {
        try{
            const updatedQuestion = await Question.findOneAndUpdate(
                { sphereId: id },
                newData
            );
    
            return updatedQuestion;
        }
        
        catch{
            return {message:"error in updating"};
        }
        
    },

    deleteQuestion: async (sphereId) => {
        try{
            const deletedQuestion = await Question.findOneAndDelete({
                sphereId
            });
    
            return deletedQuestion;
        }
        
        catch{
            return {message:"error in deleting"};
        }
        
    },
    
    addTestCasesToQuestion: async (questionId, testCases) => {
        try {
            const question = await Question.findOneAndUpdate(
                { sphereId : questionId },
                { $push: { testCaseInput: { $each: testCases.testCaseInput }, testCaseOutput: { $each: testCases.testCaseOutput } } },
                );
                
                if (!question) {
                    return {message:"question not found"};
                }
                
                return question; // Return the updated question
            } catch (err) {
                return {message:"error in adding"};
            }
        },
        
        checkUserEmail: async(userData) =>{
            const result = await validate(loginModel, userData);
            return result;
        },
        
        getUserByEmail: async (email,role,password) =>{
            const users = await User.findOne({
                email,
                password,
                role
            });
            
            if(users){
                return users.toObject();
            }
            else{
                return null;
        }

    },

}

module.exports = userDao;