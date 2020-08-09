/**
 * Http handlers module
 * @author: Felipe Mantovani
 */

const HandlerResponse = require("../models/HandlerResponse");
const helpers = require("./helpers");
const util = require("util");
const characterController = require("../controllers/characterController");
const debug = util.debuglog("handlers");


// Dependencies


// Container
const handlers = {};

handlers.ping = requestData => new Promise((resolve, reject) => {
    const response = new HandlerResponse(200, {"Message" : "Ping was successful"}, "json", requestData.httpResponse);
    resolve(response);
}); 

handlers.notFound = requestData => new Promise((resolve, reject) => {
    const response = new HandlerResponse(404, {"Error" : "Routing not found"}, "json", requestData.httpResponse);
    resolve(response);
}); 

handlers.tibiaWebSiteParser = {
    "TIBIA_HOST_URL" : "https://www.tibia.com/",
    "METHODS_ALLOWED" : ["post"]
}

handlers.tibiaWebSiteParser.character = requestData => helpers.methodIsAllowed(requestData, handlers.tibiaWebSiteParser.METHODS_ALLOWED)
    .then(methodIsAllowed => {
        if(methodIsAllowed){
            const { method } = requestData;
            return characterController[method](requestData, handlers.tibiaWebSiteParser.TIBIA_HOST_URL);
        }else{
            return new HandlerResponse(403, {"Error" : "Method is not allowed."}, "json");
        }
    }).then(html=>html)
    .catch(error => error);



// Export modules
module.exports = handlers;