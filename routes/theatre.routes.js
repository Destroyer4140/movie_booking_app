const theatreController = require('../controllers/theatre.controller');
const theatreMiddleware = require('../middlewares/theatre.middlewares');
const authMiddleware = require('../middlewares/auth.middlewares');

/**
 * 
 * @param app -> Express application instance to which the routes will be attached.
 * This function defines the routes for theatre-related operations, including creating, deleting, fetching, and updating theatres.
 */
const routes = (app) => {

  /**
   * Route to create a new theatre endpoint.
   */
  app.post(
    '/mba/api/v1/theatre',
    theatreMiddleware.validateTheatreCreateRequest,
    theatreController.createTheatre
  );

  /**
   * Route to delete a theatre by ID.
   */
  app.delete(
    '/mba/api/v1/theatre/:id',
    authMiddleware.isAuthenticated,
    theatreController.destroy
  );

  /**
   * Route to fetch a theatre by ID.
   */
  app.get(
    '/mba/api/v1/theatre/:id',
    theatreController.getTheatre
  );

  /**
   * Route to update a theatre by ID.
   */
  app.put(
    '/mba/api/v1/theatre/:id',
    theatreController.updateTheatre
  )

   /**
   * Route to partially update a theatre by ID.
   */
  app.patch(
    '/mba/api/v1/theatre/:id',
    theatreController.updateTheatre
  )

  /**
   * Route to fetch all theatres.
   */
  app.get(
    '/mba/api/v1/theatre',
    theatreController.getAllTheatres
  );
  
  /**
   * Route to update movies in a theatre.
   */
  app.patch(
    '/mba/api/v1/theatre/:id/movies',
    theatreMiddleware.validateUpdateMovieRequest,
    theatreController.updateMovieInTheatre
  );

  /**
   * Route to fetch movies in a theatre.
   */
  app.get(
    '/mba/api/v1/theatre/:id/movies',
    theatreController.getMoviesInATheatre
  );

  /**
   * Route to fetch a specific movie in a theatre by movie ID.
   */
  app.get(
    '/mba/api/v1/theatre/:id/movies/:movieId',
    theatreController.checkMovieInTheatre,
  );
}


 /**
 * Exporting the routes function for use in other parts of the application.
 */
module.exports = routes;