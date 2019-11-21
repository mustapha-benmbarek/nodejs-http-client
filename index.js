/* @title: <<nodejs-http-client>> program written in Node.js.
 * @desc: A simple program calling an external rest api with http module.
 * @author: Mustapha Benmbarek.
 * @Copyright © 2019 All rights reserved.
 * @version: 1.0.0
 */

const https = require('https');

// Declaration of the destination
const options = {
    hostname: 'jsonplaceholder.typicode.com',
    port: 443,
    path: '/users',
    method: 'GET'
};

// Establish a connection with the server
const request = https.request(options, response => {
    let data = '';

    console.log(`statusCode: ${response.statusCode}`);

    response.on('data', (chunk) => {
        data += chunk;
    });

    response.on('end', () => {
        JSON.parse(data).forEach(function (element) {
            console.log(`Person: ${element.name} | ${element.email} | ${element.address.city}`);
        });
    });
});


// Raise an exception in case of server error
request.on('error', err => {
    console.error("Exception: " + err.message);
});

// Close the connection
request.end();