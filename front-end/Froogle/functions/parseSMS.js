import he from 'he';
import { END_OF_MESSAGE, TWILIO_DEFAULT_MESSAGE } from "../constants/constants";

/**
 * Method that parses an SMS into JSON to
 * allow for easier iteration through results.
 * 
 * @param {String} text
 * @returns {Array<Object>} Returns the JSON array representation of an SMS.
 */
export default parseSMS = text => {
  let result = text.replace(TWILIO_DEFAULT_MESSAGE, '');
  result = result.replace(END_OF_MESSAGE, '');
  result = result.replace(/“/g, '"');
  result = result.replace(/”/g, '"');
  console.log('almost parsed', result);
  let resultArr = JSON.parse(result);
  return Array.isArray(resultArr) ? resultArr : [resultArr];
};
