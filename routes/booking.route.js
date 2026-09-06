const BookingController = require('../controllers/booking.controller');
const authMiddleware = require('../middlewares/auth.middlewares');
const bookingMiddleware = require('../middlewares/booking.middlewares');

const routes = (app) => {
  // Create a new booking
  app.post(
    '/mba/api/v1/booking',
    authMiddleware.isAuthenticated,
    bookingMiddleware.validateBookingCreateRequest,
    BookingController.createBooking
  );

  // Get all bookings
  app.get(
    '/mba/api/v1/bookings',
    authMiddleware.isAuthenticated,
    authMiddleware.isAdmin,
    BookingController.getAllBookings
  );

  // Get a booking for logged in user.
  app.get(
    '/mba/api/v1/booking',
    authMiddleware.isAuthenticated,
    BookingController.getBookingByUserId
  );

    // Get a booking by bookingId for logged in user.
  app.get(
    '/mba/api/v1/booking/:id',
    authMiddleware.isAuthenticated,
    BookingController.getBookingById
  );

  // Update a booking by ID
  app.patch(
    '/mba/api/v1/booking/:id',
    authMiddleware.isAuthenticated,
    bookingMiddleware.canChangeStatus,
    BookingController.updateBookingById
  );
};

module.exports = routes;