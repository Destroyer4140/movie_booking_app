const theatreService = require('../services/theatre.service');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');

const createTheatre = async (req, res) => {
  try {
    const response = await theatreService.createTheatre(req.body);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message = "Failed on schema validation.";
      return res.status(response.code).json(errorResponseBody);
    }

    successResponseBody.data = response;
    successResponseBody.message = "Successfully created the theatre";
    return res.status(201).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = err;
    errorResponseBody.message = "failed to create the theatre";
    return res.status(500).json(errorResponseBody);
  }
}

const destroy = async (req, res) => {
  try {
    const response = await theatreService.deleteTheatre({ _id: req?.params?.id });
    if (response.err) {
          errorResponseBody.err = response.err;
          errorResponseBody.message = "No theatre found."
          return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully deleted the theatre";
        return res.status(200).json(successResponseBody);
  } catch (err) {
    errorResponseBody.err = err;
    errorResponseBody.message = "failed to delete the theatre";
    return res.status(500).json(errorResponseBody);
  }
}

const getTheatre = async (req, res) => {
  try {
    const response = await theatreService.getTheatre(req?.params?.id);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message = "No Theatre found with provided TheatreId.";
      return res.status(response.code).json(errorResponseBody);
    }

    successResponseBody.data = response;
    successResponseBody.message = "Successfully fetched the theatre.";
    return res.status(200).json(successResponseBody);
  } catch (err) {
    errorResponseBody.err = err;
    errorResponseBody.message = "Failed to get the theatre.";
    return res.status(500).json(errorResponseBody);
  }
}

const updateTheatre = async (req, res) => {
  try {
    const response = await theatreService.updateTheatre(req.params.id, req.body);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message = "No Theatre found with provided TheatreId. Hence updation failed.";
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Successfully updated the theatre.";
    return res.status(200).json(successResponseBody);
  } catch (err) {
      errorResponseBody.err = err;
      errorResponseBody.message = "Failed to update the theatre.";
      return res.status(500).json(errorResponseBody);
  }
}

module.exports = {
  createTheatre,
  destroy,
  getTheatre,
  updateTheatre
}