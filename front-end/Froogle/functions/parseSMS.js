export default parseSMS = text => {
  console.log('text is ' + text);
  let result = text.replace(`Sent from your Twilio trial account - `, '');
  result = result.replace(' END', '');
  result = result.replace(/“/g, '"');
  result = result.replace(/”/g, '"');
  let resultArr = JSON.parse(result);
  console.log(resultArr);
  return resultArr;
};

// `Sent from your Twilio trial account - ["Liverpool Football Club is a professional football club in Liverpool, England, that competes in the Premier League, the top tier of English footbal..."]`

// `Sent from your Twilio trial account - [{"title":"Liverpool F.C. - Wikipedia","url":"https://en.wikipedia.org/wiki/Liverpool_F.C.","desc":""}]`;
