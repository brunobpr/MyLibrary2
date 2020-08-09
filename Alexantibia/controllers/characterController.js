/**
 * CharacterController module - interacts to tibia website to retrieve character related info
*/

const httpRequest = require("../lib/httpRequest");

// Dependencies
const path = require("path");
const HandlerResponse = require("../models/HandlerResponse");
const helpers = require("../lib/helpers");


// container
const characterController = {
    "path" : "community/",
    "queryString" : "?subtopic=characters",
    "headers" : {
        "accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-encoding" : "utf-8",
        "user-agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36",
        'Content-Type' : 'application/x-www-form-urlenconded',
        "method": "POST",
        "scheme": "https"
    }
};

characterController.post = (requestData, hostUrl) => new Promise((resolve, reject) => {
    httpRequest
        .post(hostUrl + characterController.path + characterController.queryString, characterController.headers, requestData.payload)
        .then(html => helpers.parseHTML(html))
        .then(character => resolve(new HandlerResponse(200, character, "json")))
        .catch(e => { console.log(e) ; reject(new HandlerResponse(500, {"Error" : "Could not connect to Tibia"}, "json", requestData.httResponse))})
})




// export Modules
module.exports = characterController;
