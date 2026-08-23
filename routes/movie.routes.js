const movieController = require('../controllers/movie.controller');
const movieMiddleware = require('../middlewares/movie.middlewares');

/**
 * 
 * @param app -> Express application instance to which the routes will be attached.
 * This function defines the routes for movie-related operations, including creating, deleting, fetching, and updating movies.
 */
const routes = (app) => {
  /**
   * Route to create a new movie endpoint.
   */
  app.post(
    '/mba/api/v1/movies',
    movieMiddleware.validateMovieCreateRequest,
    movieController.createMovie
  );

  /**
   * Route to delete a movie by ID.
   */
  app.delete('/mba/api/v1/movies/:id', movieController.deleteMovie);

  /**
   * Route to fetch a movie by ID.
   */
  app.get('/mba/api/v1/movies/:id', movieController.getMovie);

  /**
   * Route to update a movie by ID.
   */
  app.put('/mba/api/v1/movies/:id', movieController.updateMovie);

  /**
   * Route to partially update a movie by ID.
   */
  app.patch('/mba/api/v1/movies/:id', movieController.updateMovie);

  /**
   * Route to fetch all movies.
   */
  app.get(
    '/mba/api/v1/movies',
    movieController.getMovies
  )
}

module.exports = routes;