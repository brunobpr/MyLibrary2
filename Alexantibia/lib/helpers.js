/**
 * Helpers library
 * @author: Felipe Mantovani
 */

// Dependencies
const path = require("path");
const HandlerResponse = require("../models/HandlerResponse");
const cheerio = require('cheerio');
const { title } = require("process");

//Container
const helpers = {}

// Parse a JSON string to an object in all cases without throwing
helpers.parseJsonToObject = (str) => {
    try {
        const obj = JSON.parse(str);
        return obj;
    } catch (e) {
        return {};
    }
}

helpers.trimPath = path => path.replace(/^\/+|\/+$/g, "");


helpers.isArray = array => new Promise((resolve, reject) => {
    try {
        resolve(Array.isArray(array));
    } catch (e) {
        reject(false);
    }
});

helpers.methodIsAllowed = (requestData, allowedMethods) => helpers.isArray(allowedMethods)
    .then(valid => {
        if (valid) {
            const { method } = requestData;
            return allowedMethods.indexOf(method) > -1;
        } else {
            return new HandlerResponse(500, { "Error": "Allowed Methods is not an array." }, "json");
        }
    }).catch(e => e)


helpers.parseHTML = html => new Promise((resolve, reject) => {
    try {
        const body = (cheerio('td', html).text());
        const character = {
            "Name": body.substring(body.lastIndexOf("InformationName:") + 16, body.indexOf(" Title:")),
            "Title": body.substring(body.indexOf("Title:") + 6, body.indexOf("Sex:")),
            "Sex": body.substring(body.indexOf("Sex:") + 4, body.indexOf("Vocation:")),
            "Vocation": body.substring(body.indexOf("Vocation:") + 9, body.indexOf("Level:")),
            "Achievement Points": body.substring(body.indexOf("Points:") + 7, body.indexOf("World:")),
            "Level": body.substring(body.indexOf("Level:") + 6, body.indexOf("Achievement Points:")),
            "World": body.substring(body.indexOf("World:") + 6, body.indexOf("Residence:")),
            "Last Login": body.substring(body.indexOf("Last Login:") + 11, body.indexOf("Account Status:")),
            "Account Status:": body.substring(body.indexOf("Account Status:") + 15, body.indexOf("Account Achievements")),
        }
        if (body.includes("Married To")) {
            character.Residence = body.substring(body.indexOf("Residence:") + 10, body.indexOf("Married To:"));
            character.Married_To = body.substring(body.indexOf("Married To:") + 11, body.indexOf("Last Login:"));
        } else {
            character.Residence = body.substring(body.indexOf("Residence:") + 10, body.indexOf("Last Login:"));
        }
        resolve(character);
    } catch (e) {
        reject(e)
    }
});





// Export Module
module.exports = helpers;