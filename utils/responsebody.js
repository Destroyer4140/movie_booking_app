const errorResponseBody = {
  err: {},
  data: {},
  message: "Something went wrong, Failed to fetch the movie",
  success: false
}

const successResponseBody = {
  err: {},
  data: {},
  message: "Successfully processed the request.",
  success: true
}

module.exports = {
  successResponseBody,
  errorResponseBody
}