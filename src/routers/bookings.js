import { Router } from 'express';
import {
  createBooking,
  getMyBookings,
  deleteBooking,
  cancelBooking,
  updateBooking,
} from '../controllers/bookingsController.js';
import { authenticate } from '../middlewares/authenticate.js';

// import { authMiddleware } from '../middlewares/authMiddleware.js';
// const authMiddleware = require('../middlewares/authMiddleware.js');

const bookingsRouter = Router();

bookingsRouter.use(authenticate);
bookingsRouter.post('/', createBooking);

// Отримати всі свої бронювання
bookingsRouter.get('/me', getMyBookings);

// Видалити бронювання
bookingsRouter.delete('/:id', deleteBooking);

// Відмінити бронювання
bookingsRouter.patch('/:id/cancel', cancelBooking);
// Змінити данні по бронюванню
bookingsRouter.patch('/:id/update', updateBooking);
// Створити нове бронювання
// bookingsRouter.post('/', authMiddleware, createBooking);

// // Отримати всі свої бронювання
// bookingsRouter.get('/me', authMiddleware, getMyBookings);

// // Видалити бронювання
// bookingsRouter.delete('/:id', authMiddleware, deleteBooking);

// // Відмінити бронювання
// bookingsRouter.patch('/:id/cancel', authMiddleware, cancelBooking);

export default bookingsRouter;
