/**
 * Class to model the response that comes from handlers
 */

class HandlerResponse{
    /**
     * 
     * @param {Number} statusCode 
     * @param {object} payload 
     * @param {String} contentType 
     * @param {HTTPResponse} res 
     */
    constructor(statusCode, payload, contentType){
        this.statusCode = statusCode;
        this.payload = payload;
        this.contentType = contentType;
    }
}

// export module
module.exports = HandlerResponse;