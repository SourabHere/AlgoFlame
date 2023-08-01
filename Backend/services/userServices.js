const userDAO = require('../dao/userDao');
const jwt = require('jsonwebtoken');
var request = require('request');
const { resolve } = require('../validations/login');
require('dotenv').config();
var accessToken = process.env.ACCESS_TOKEN;

var endpoint = process.env.ENDPOINT;

const userService = {
    createUser: async (userdata) => {
        return userDAO.createUser(userdata);
    },

    getUserById: async (userId) =>{
        return userDAO.getUserById(userId);
    },

    createToken: (userData,role) =>{
        const token = jwt.sign({...userData,role},role === "user"?process.env.JWT_USER_SECRET:role === "admin"?process.env.JWT_ADMIN_SECRET:process.env.JWT_COMMON_SECRET,{"expiresIn":86400});
        return token;
    },

    userLogin: async (userData,role) =>{
        const user = await userDAO.getUserByEmail(userData.email,role,userData.password);
        return user;
    },

    submitCode: async (submissionData) => {
        var subData = {
            problemId: submissionData.problemId,
            compilerId: submissionData.compilerId,
            source: submissionData.source
        };
    
        return new Promise((resolve, reject) => {
            request({
                url: 'https://' + endpoint + '/api/v4/submissions?access_token=' + accessToken,
                method: 'POST',
                form: subData
            }, async function (error, response, body) {
                if (error) {
                    console.log('Connection problem');
                    reject(error);
                } else {
                    if (response.statusCode === 201) {
                        const res = JSON.parse(response.body);
                        resolve(res);
                    } else {
                        if (response.statusCode === 401) {
                            console.log('Invalid access token');
                        } else if (response.statusCode === 402) {
                            console.log('Unable to create submission');
                        } else if (response.statusCode === 400) {
                            var body = JSON.parse(response.body);
                            console.log('Error code: ' + body.error_code + ', details available in the message: ' + body.message)
                        }
                        resolve(null);
                    }
                }
            });
        });
    },

    retrieveSubmission: (submissionId) => {

        return new Promise((resolve,reject) => {

            request({
                url: 'https://' + endpoint + '/api/v4/submissions/' + submissionId + '?access_token=' + accessToken,
                method: 'GET'
            }, async function (error, response, body) {
                
                if (error) {
                    console.log('Connection problem');
                }
                
                if (response) {
                    if (response.statusCode === 200) {
                        // console.log(JSON.parse(response.body));
                        var res = await JSON.parse(response.body);
                        resolve(res);
                        
                    } else {
                        if (response.statusCode === 401) {
                            console.log('Invalid access token');
                            resolve(null);
                        } else if (response.statusCode === 403) {
                            console.log('Access denied');
                            resolve(null);
                        } else if (response.statusCode === 404) {
                            console.log('Submision not found');
                            resolve(null);
                        }
                    }
                }
            });
        });
        },
        
    };
    
module.exports = userService;