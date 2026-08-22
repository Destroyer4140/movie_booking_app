const theatreController = require('../controllers/theatre.controller');
const theatreMiddleware= require('../middlewares/theatre.middlewares');


const routes = (app) => {
  app.post(
    '/mba/api/v1/theatre',
    theatreMiddleware.validateTheatreCreateRequest,
    theatreController.createTheatre
  );

  app.delete(
    '/mba/api/v1/theatre/:id',
    theatreController.destroy
  );

  app.get(
    '/mba/api/v1/theatre/:id',
    theatreController.getTheatre
  );

  app.put(
    '/mba/api/v1/theatre/:id',
    theatreController.updateTheatre
  )
}

module.exports = routes;