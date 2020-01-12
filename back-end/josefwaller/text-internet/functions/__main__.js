const rp = require('request-promise');
const JSSoup = require('jssoup').default;
const url = require("url");


/*
 * @params {string} search What to search for
 * @returns {string}
 */

module.exports = async (search = 'Beavers', context) => {

  // Get the response to the request
  let responce = await getWikipedia(search);
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
/*
 * Given a wikipedia url, fetches the first bit of the summary
 */
function getWikipedia(url) {
  // First change the URL from a regular wikipedia one to a wikipedia api url
  let apiUrl = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${url.split("/").splice(-1).pop()}`;
  let x = rp(apiUrl).then((body) => {
    console.log("Responce received");
    // Get the body of the wikipedia article
    let contentHtml = JSON.parse(body)["query"]["pages"];
    contentHtml = contentHtml[Object.keys(contentHtml)[0]]["extract"];
    // Limit to 150 characters
    const LIMIT = 150;
    let content = contentHtml.substring(0, LIMIT - 3) + "...";
    // Return the trimmed content
    return content;
  });
  return x;
}
