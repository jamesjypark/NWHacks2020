const lib = require('lib');
const request = require('request');
const rp = require('request-promise');
const xml = require("xml");

module.exports = async (name = 'world', context) => {

  // Get the response to the request
  let x = await getResponse();
  // For now, just return the response
  return result;
};

/*
 * Gets the response of a text given by the user
 * Returns a json response
 */
function getResponse(text) {
  // First,
  let x = rp('https://en.wikipedia.org/w/api.php?action=query&explaintext=1&prop=extracts&titles=fried_chicken&format=json').then((body) => {
    console.log("Responce received");
    // Get the body of the wikipedia article
    let content = JSON.parse(body)["query"]["pages"]["18598020"]["extract"];
    // Get the first 3 sentances
    let sentances = content.split('.').splice(0, 2).join('.');
    // Return something in XML
    let response = `<?xml version="1.0" encoding="UTF-8"?><Response><Body>${sentances}<Body></Response>`;
    return response;
  });
  return x;

}
