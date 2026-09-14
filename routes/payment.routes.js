const paymentController = require('../controllers/payment.controller');
const authMiddleware = require('../middlewares/auth.middlewares');
const paymentMiddleware = require('../middlewares/payment.middlewares');

const routes = (app) => {
  app.post(
    '/mba/api/v1/payments',
    authMiddleware.isAuthenticated,
    paymentMiddleware.verifyPaymentCreateRequest,
    paymentController.create
  );

  app.get(
    '/mba/api/v1/payments/:id',
    authMiddleware.isAuthenticated,
    paymentController.getPaymentDetailsById
  );

  app.get(
    '/mba/api/v1/payments',
    authMiddleware.isAuthenticated,
    paymentController.getAllPayments
    );
}

module.exports = routes;