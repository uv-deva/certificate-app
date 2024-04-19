import axios from 'axios'

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  console.log('Parsing Response:', response)
  if (response.status === 205) {
    return null
  }

  if (response.status === 204) {
    return {data:response.data ? response.data : "No Content"}
  }
  
  return response
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  console.log('STATUS:', response.status)
  if (response.status >= 200 && response.status <= 500) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  throw error
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  
  return axios(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .catch((error) => {
      return error.response
    })
}
