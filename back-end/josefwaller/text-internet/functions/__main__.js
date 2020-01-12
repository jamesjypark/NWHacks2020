const rp = require('request-promise');
const JSSoup = require('jssoup').default;
const url = require("url");
const he = require("he");
const matchAll = require("match-all");


/**
 * @param {string} Body The body of the message
 * @returns {object.http} xml The XML
 */
module.exports = async (Body= '{ "type" : "search" , "query" : "whats the weather" }' , context) => {
  

  // Get the response to the request
 //let res = await getWebpage("https://en.wikipedia.org/wiki/Open_specifications");
  // For now, just return the response as XML
  const result = await checkResponse(JSON.parse(Body));
  let contents = JSON.stringify(result).replace("&nbsp;", "") + " END";
  let xml = "";
  const SIZE = 600;
  for (let i = 0; i < contents.length / SIZE; i++) {
    xml += `<Message><Body>${contents.slice(SIZE * i, (i + 1) * SIZE)}</Body></Message>`;
  }
  console.log(xml);
  return {
    body: `<?xml version="1.0" encoding="UTF-8"?><Response>${xml}</Response>`,
    headers: {
      'Content-Type': "application/xml"
    },
    statusCode: 200
  };
};


async function checkResponse(text){
  
  if(text.type === "search"){
    //  const responseValue = await getSearchResponse(text.query);   
    //  return JSON.stringify(responseValue);
     return await getSearchResponse(text.query); 
    }

  else if(text.type === "get") {
     // const responseValue = await getWebpage(text.url);  
    // return JSON.stringify(responseValue);
     return await getWebpage(text.url);
    }

}

/*
 * Gets the response of a text given by the user
 * Returns a json response
 */
function getSearchResponse(text) {
  // First, get bing :( response
  let res = rp(`https://www.bing.com/search?q=${text}`).then((body) => {
    var soup = new JSSoup(body);
    // Get the regular responses
    var resultsHTML = soup.findAll('li', 'b_algo');
    let results = resultsHTML.slice(0, 4).map(e => {
      let titleHtml = e.find("h2");
      if (titleHtml) {
        let urlHtml = titleHtml.find("a");
        let descHtml = e.find("p") ? e.find("p") : e.find("span");
        if (urlHtml && descHtml) {
          return {
            title: titleHtml.text,
            url: urlHtml.attrs["href"],
            desc: descHtml.text
          }
        } else {
          return null
        }
      }
    }).filter(e => e != null);
    // Get the card, if there is one
    let x = soup.find("li", "b_ans");
    const DESC_SIZE = 100;
    if (x) {
      // Ensure the card has the right things in it
      let descHtml = x.find("span");
      let urlHtml = x.find("a");
      let titleHtml = x.find("div", "b_clearfix") || x.find("h2"); 
      if (descHtml && urlHtml && titleHtml) {
        results = results.concat({
          type: "card",
          desc: descHtml.text.substring(0, DESC_SIZE - 3) + "...",
          url: urlHtml.attrs["href"],
          title: titleHtml.text
        });
      }
    }
    return results;
  });
  return res;
}
/*
 * Return a webpage's text result as an array
 */
function getWebpage(urlStr) {
  if (urlStr.match(/en\.wikipedia\.com/)) {
    return { desc: getWikipedia(urlStr) };
  } else {
    // Get the contents
    let res = rp(urlStr).then(body => {
      var soup = new JSSoup(body);
      // Store every p tag which has at least 200 words in it
      let contents = soup.findAll("p").filter(e => e.text.length > 200).map(e => e.text).join(". ");
      return { desc: contents.substring(0, 147) + "..." };
    });
    return res;
  }
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
