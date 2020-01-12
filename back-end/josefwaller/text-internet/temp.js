const https = require("https");

console.log("ASDF");

let req = https.get({
  hostname: 'en.wikipedia.org',
  path: '/w/api.php?action=parse&page=fried_chicken&format=json',
  method: 'GET'
}, res=> {
  let body = '';
  res.on('data', d => {
    body += d;
  });

  res.on('end', () => {
    console.log(JSON.parse(body)['parse']['title']);
  });
});

req.end()
