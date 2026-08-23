/**
 * This object will be used as a template for building error responses
 */
const errorResponseBody = {
  err: {},
  data: {},
  message: "Something went wrong, Failed to fetch the movie",
  success: false
}

/**
 * This object will be used as a template for building success responses
 */
const successResponseBody = {
  err: {},
  data: {},
  message: "Successfully processed the request.",
  success: true
}

/**
 * This object will be used as a template for building bad request responses
 */
const badRequestResponse = {
  success: false,
  err: "",
  data: {},
  message: "Malformed Request | Bad Request."
}

/**
 * Exporting the variable from here.
 */
module.exports = {
  successResponseBody,
  errorResponseBody,
  badRequestResponse
}