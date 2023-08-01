const userDAO = require('../dao/userDao');
var request = require('request');

// define access parameters
require('dotenv').config();

var accessToken = process.env.ACCESS_TOKEN;

var endpoint = process.env.ENDPOINT;

const adminServices = {
    createProblem: async (problemDesc,res) => {

        var problemData = {
            name: problemDesc.name,
            description: problemDesc.description,
            masterjudgeId: 1001
        };
        
        // send request
        request({
            url: 'https://' + endpoint + '/api/v4/problems?access_token=' + accessToken,
            method: 'POST',
            form: problemData
        }, async function (error, response, body) {
            
            if (error) {
                console.log('Connection problem');
                res.status(400).json({message:'Connection problem'})
                return null;
            }
            
            // process response
            if (response) {
                if (response.statusCode === 201) {
                    console.log(JSON.parse(response.body)); // problem data in JSON
                    problemDesc.sphereId = await JSON.parse(response.body).id;
                    const res = await userDAO.addQuestion(problemDesc);
                    // console.log(problemDesc);
                    return {message : "question added successfully"};

                } else {
                    if (response.statusCode === 401) {
                        console.log('Invalid access token');
                        res.status(401).json({message:'Invalid access token'})
                        return null;
                    } else if (response.statusCode === 400) {
                        var body = JSON.parse(response.body);
                        console.log('Error code: ' + body.error_code + ', details available in the message: ' + body.message)
                        res.status(400).json({message:body.message})
                        return null;
                    }
                }
            }
        });
        
        
    },

    updateProblem: (newData,sphereId) =>{
        var problemId = sphereId;
        var problemData = newData;
        
        userDAO.updateQuestion(newData,sphereId);

        // send request
        request({
            url: 'https://' + endpoint + '/api/v4/problems/' + problemId +  '?access_token=' + accessToken,
            method: 'PUT',
            form: problemData
        }, function (error, response, body) {
            
            if (error) {
                console.log('Connection problem');
            }
            
            // process response
            if (response) {
                if (response.statusCode === 200) {
                    console.log('Problem updated');
                    return {message:"problem updated"};
                } else {
                    if (response.statusCode === 401) {
                        console.log('Invalid access token');
                    } else if (response.statusCode === 403) {
                        console.log('Access denied');
                    } else if (response.statusCode === 404) {
                        console.log('Problem does not exist');
                    } else if (response.statusCode === 400) {
                        var body = JSON.parse(response.body);
                        console.log('Error code: ' + body.error_code + ', details available in the message: ' + body.message)
                    }
                }
            }
        });
        
    },

    deleteProblem: (problemId) =>{
        // send request
        const del = userDAO.deleteQuestion(problemId);
        request({
            url: 'https://' + endpoint + '/api/v4/problems/' + problemId + '?access_token=' + accessToken,
            method: 'DELETE'
        }, function (error, response, body) {
            
            if (error) {
                console.log('Connection problem');
            }
            
            // process response
            if (response) {
                if (response.statusCode === 200) {
                    return del;
                } else {
                    if (response.statusCode === 401) {
                        console.log('Invalid access token');
                    } else if (response.statusCode === 403) {
                        console.log('Access denied');
                    } else if (response.statusCode === 404) {
                        console.log('Problem not found');
                    }
                }
            }
        });

    },

    addTestCase: (testCaseData,id) =>{

        const addedTc = userDAO.addTestCasesToQuestion(id,testCaseData);
        const problemId = id;
        var testcaseData = {
            input: testCaseData.testCaseInput,
            output: testCaseData.testCaseOutput,
            timelimit: 5,
            judgeId: 1
        };
        
        // send request
        request({
            url: 'https://' + endpoint + '/api/v4/problems/' + problemId +  '/testcases?access_token=' + accessToken,
            method: 'POST',
            form: testcaseData
        }, function (error, response, body) {
            
            if (error) {
                console.log('Connection problem');
            }
            
            // process response
            if (response) {
                if (response.statusCode === 201) {
                    console.log("here");
                    console.log(JSON.parse(response.body)); // testcase data in JSON
                    return addedTc;
                }
                else {
                    if (response.statusCode === 401) {
                        console.log('Invalid access token');
                    } else if (response.statusCode === 403) {
                        console.log('Access denied');
                    } else if (response.statusCode === 404) {
                        console.log('Problem does not exist');
                    } else if (response.statusCode === 400) {
                        var body = JSON.parse(response.body);
                        console.log('Error code: ' + body.error_code + ', details available in the message: ' + body.message)
                    }
                }
            }
        });
    },
}

module.exports = adminServices;