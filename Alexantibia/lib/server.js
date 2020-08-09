/**
 * Server for the API
 * @author: Felipe Mantovani
 */

// Dependencies
const helpers = require("./helpers");
const http = require("http");
const url = require("url");
const handlers = require("./handlers");
const StringDecoder = require("string_decoder").StringDecoder;
const util = require("util");
const debug = util.debuglog("server")



// Container declaration
const server = {}

//Creating http server
server.httpServer = http.createServer((req, res)=>{
    server.unifiedServer(req, res);
});


// Unified function for http and https functions
server.unifiedServer = (req, res)=>{
    //Get URL and parse it. 
    const parsedUrl = url.parse(req.url, true);

    // Get the path
    const path        = parsedUrl.pathname;
    const trimmedPath = helpers.trimPath(path); 


    //Get the query string as an object.
    const queryStringObject = parsedUrl.query;


    //Get the HTTP Method.
    const method = req.method.toLowerCase();


    //Get the headers as an object
    const headers = req.headers;


    //Get the payload, if any
    const decoder = new StringDecoder("utf-8");
    let buffer = "";

    req.on("data", data=>{
        buffer += decoder.write(data);
    });

    req.on("end", ()=>{

        buffer += decoder.end();
        //Choose the handler where the request should go to. If one is not found, use the not found handler. 
        const chosenHandler = typeof(server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;
        debug(chosenHandler);

        //construct the data object to send to the handler
        const requestData = {
            trimmedPath : trimmedPath,
            queryStringObject : queryStringObject,
            method : method,
            headers : headers,
            payload: helpers.parseJsonToObject(buffer),
        }

        chosenHandler(requestData)
            .then(response => {
                const { statusCode, payload, contentType } = response;
                // Determine the type of response (fallback to JSON)
                const validatedContentType = typeof(contentType) == "string" ? contentType : "json";

                // Use the status code returned from the handler, or set the default status code to 200
                const validatedStatusCode = typeof(statusCode) == "number" ? statusCode : 200;


                // Return the response parts that are content-type specific
                var payloadString = "";

                if(validatedContentType == "json"){
                    res.setHeader('Content-Type', 'application/json');
                }
                
                const validatedPayload = typeof payload == 'object'? payload : {};
                payloadString = JSON.stringify(validatedPayload);
                
                // Return the response-parts common to all content-types
                res.writeHead(validatedStatusCode);
                res.end(payloadString);
            }
        ).catch(e=>console.log(e));
    });
}



server.init = () => {
    // Starting to listen http.
    server.httpServer.listen(3000, () => {
        console.log("\x1b[36m%s\x1b[0m" ,`Server listenning`);
    });
};

// Routers for the server
server.router = {
    "api/v1/ping" : handlers.ping,
    "api/v1/character" : handlers.tibiaWebSiteParser.character,
    "notfound" : handlers.notFound,
}

// Export the module
module.exports = server;