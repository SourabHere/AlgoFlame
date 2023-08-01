const { Question } = require('../models/models');

const questionDAo = {

    getQuestions: async () => {
        const ques = await Question.find();
        return ques;
    },

    getQuestionById:  async (id) => {
        const que = await Question.findOne({sphereId:id});
        return que;
    },
}

module.exports = questionDAo;