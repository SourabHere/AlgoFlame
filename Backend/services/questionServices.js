const questionDao = require('../dao/questionDao');

const questionServices = {

    getQuestions:  () => {
        return questionDao.getQuestions();
    },
    getQuestionById:  (id) => {
        return questionDao.getQuestionById(id);
    },

}

module.exports = questionServices;