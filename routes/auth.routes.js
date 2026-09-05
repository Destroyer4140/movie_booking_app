const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middlewares');


const routes = (app) => {
  // Signup route to controller
  app.post(
    '/mba/api/v1/auth/signup',
    authMiddleware.validateSignupRequest,
    authController.signup
  );

  // SignIn or Login route to controller
  app.post(
    '/mba/api/v1/auth/signin',
    authMiddleware.validateSigninRequest,
    authController.signin
  );

  // Reset Password route to controller
  app.patch(
    '/mba/api/v1/auth/reset',
    authMiddleware.isAuthenticated,
    authMiddleware.validateResetPasswordRequest,
    authController.resetPassword
  );
};

module.exports = routes;