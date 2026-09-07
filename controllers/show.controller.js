const showService = require('../services/show.service');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');
const { STATUS } = require('../utils/constants');


const create = async (req, res) => {
  try {
    const response = await showService.createShow(req.body);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully created the show.";
    return res.status(STATUS.CREATED).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      errorResponseBody.message = "Failed to create show.";
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    errorResponseBody.message = "Internal Server Error, Failed to create show.";
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}

const getShows = async (req, res) => {
  try {
    const response = await showService.getShows(req.body);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully reterive the shows!!";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      errorResponseBody.message = "Not found the record."
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    errorResponseBody.message = "Internal Server Error got while finding the shows."
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}

const destroy = async (req, res) => {
  try {
    const response = await showService.deleteShow(req.params.id);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully deleted the shows!!";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      errorResponseBody.message = "Not found the record."
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    errorResponseBody.message = "Internal Server Error got while deleteing the shows."
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}

const update = async (req, res) => {
  try {
    const response = await showService.updateShow(req.params.id, req.body);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully updated the shows!!";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      errorResponseBody.message = "Failed to update the show record."
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    errorResponseBody.message = "Internal Server Error got while updating the shows."
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}

module.exports = {
  create,
  getShows,
  destroy,
  update
}