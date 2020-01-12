const lib = require('lib');

module.exports = async (name = 'world', context) => {
  let result = await lib.utils.sms({
    to: '+17786771604',
    body: "James didn't send this lol"
  });
  return result;
};
