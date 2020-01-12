const rp = require('request-promise');
const JSSoup = require('jssoup').default;
const url = require("url");


/*
 * @params {string} search What to search for
 * @returns {string}
 */

module.exports = async (search = 'beavers', context) => {

  // Get the response to the request
  let responce = await getResponse(search);
  // For now, just return the response
  return responce;
};

/*
 * Gets the response of a text given by the user
 * Returns a json response
 */
function getResponse(text) {
  // First, get bing :( response
  let res = rp(`https://www.bing.com/search?q=${text}`).then((body) => {
    var soup = new JSSoup(body);
    // Get the regular responses
    var resultsHTML = soup.findAll('li', 'b_algo');
    let results = resultsHTML.map(e => ({
      title: e.find("h2").text,
      url: e.find("h2").find("a").attrs["href"],
      desc: e.find('p') ? e.find("p").text : e.find("span").text
    }));
    // Get the card, if there is one
    let x = soup.find("div", "b_subModule");
    if (x) {
      results = results.concat({
        type: "card",
        desc: x.find("span").text,
        url: x.find("a").attrs["href"],
        title: x.find("h2").text
      });
    }
    return results;
  });
  return res;
}

function getWikipedia(url) {
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
