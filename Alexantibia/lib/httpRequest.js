/**
 * HttpRequest module
 */

// Dependencies
const StringDecoder = require("string_decoder").StringDecoder;
const https = require("https");
const queryString = require("querystring");
const url = require("url");


// Container
const httpRequest = {};

httpRequest.get = (fullUrl, headers) => httpRequest.request(fullUrl, "GET", headers);

httpRequest.post = (fullUrl, headers, body) => httpRequest.request(fullUrl, "POST", headers, body);


httpRequest.request = (fullUrl, method, headers, body) => new Promise((resolve, reject) => {

    const urlObject = url.parse(fullUrl);

    const {host, path} = urlObject;

    body = typeof body == "object" ? body : {}; 

    const stringPayload = queryString.stringify(body);

    headers['Content-Length'] = Buffer.byteLength(stringPayload);
    headers['Content-Type'] = 'application/x-www-form-urlencoded';

    console.log(host, path);

    const options = {
        "hostname" : host,
        "path" : path,
        "method" : method,
        "headers" : headers,
        'protocol' : 'https:'
    };

    const req = https.request(options, res => {
        const decoder = new StringDecoder("utf-8"); 
        let data = ""

        res.on("data", d => {
            data += decoder.write(d);
            
        })
        res.on("end", () => {
            data += decoder.end();
            resolve(data);
        });

        res.on("error", e => {
            reject(e.message);
        });

        });
        req.write(stringPayload);
    req.end();
});



// Export module
module.exports = httpRequest;