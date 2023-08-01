const userDAO = require('../dao/userDao');
var request = require('request');

// define access parameters
var accessToken = 'ca53ec4f0ec291bc14febde1cd18bb84';
var endpoint = '1be03711.problems.sphere-engine.com';

const problemService = {
    sendSubmission: async(submissionData) =>{
        // define request parameters
        var submissionData = {
            problemId: 42,
            compilerId: 11,
            source: '<source_code>'
        };
        
        // send request
        request({
            url: 'https://' + endpoint + '/api/v4/submissions?access_token=' + accessToken,
            method: 'POST',
            form: submissionData
        }, function (error, response, body) {
            
            if (error) {
                console.log('Connection problem');
            }
            
            // process response
            if (response) {
                if (response.statusCode === 201) {
                    console.log(JSON.parse(response.body)); // submission data in JSON
                    return response.body;
                } else {
                    if (response.statusCode === 401) {
                        console.log('Invalid access token');
                    } else if (response.statusCode === 402) {
                        console.log('Unable to create submission');
                    } else if (response.statusCode === 400) {
                        var body = JSON.parse(response.body);
                        console.log('Error code: ' + body.error_code + ', details available in the message: ' + body.message)
                    }
                }
            }
        });
    },

    submissionDetails: async (submissionId) => {
        request({
            url: 'https://' + endpoint + '/api/v4/submissions/' + submissionId + '?access_token=' + accessToken,
            method: 'GET'
        }, function (error, response, body) {
            
            if (error) {
                console.log('Connection problem');
            }
            
            // process response
            if (response) {
                if (response.statusCode === 200) {
                    console.log(JSON.parse(response.body)); // submission data in JSON
                    return response.body;
                } else {
                    if (response.statusCode === 401) {
                        console.log('Invalid access token');
                    } else if (response.statusCode === 403) {
                        console.log('Access denied');
                    } else if (response.statusCode === 404) {
                        console.log('Submision not found');
                    }
                }
            }
        });

    },


}



