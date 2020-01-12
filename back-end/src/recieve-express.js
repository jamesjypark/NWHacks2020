const app = require('express')()
const bodyParser = require('body-parser')
const Nexmo = require('nexmo')

const rp = require('request-promise');
const JSSoup = require('jssoup').default;
const url = require("url");

const input_query;

module.exports = async (search = 'beavers', context) => {

    // Get the response to the request
    let responce = await getResponse(search);
    // For now, just return the response
    return responce;
};


const nexmo = new Nexmo({
    apiKey: "bbfaeed5",             //API_KEY
    apiSecret: "5dNY9j8edeZTfYjH"   // API_SECRET
})

const from = "12262108306"
const to = "17786777623"    // reciever phone number here.
const text = 'A text message sent using the Nexmo SMS API'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app
    .route('/webhooks/inbound-sms')
    .get(handleInboundSms)


function handleInboundSms(request, response) {
    const params = Object.assign(request.query, request.body)
    console.log(params)
    
    /* Check this query type.
        Search - get a search response.
        Link - its a link url.
    */

    input_query = JSON.parse(params);
   
    //console.log(input_query)
    
    if(input_query.type === "search"){
        JSON.stringify(getSearchResponse(input_query.query))
    }

    else {
        // a link.
    }
    
    response.status(200).send()

}

app.listen(process.env.PORT || 3000)


/**  
 * The text to be sent back. 
 * 
**/

function sendMessage(text) {
    nexmo.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
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
