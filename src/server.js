import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { logger } from './middlewares/logger.js';
import contactsRout from './routers/contacts.js';
import bookingsRouter from './routers/bookings.js';
import authRouter from './routers/auth.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = async () => {
  const app = express();

  app.use(cors()); // швидко дозволити все під час розробки

  app.use((req, res, next) => {
    res.header('Referrer-Policy', 'no-referrer-when-downgrade');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

  //  Додаємо CORS перед `cookieParser`
  // тимчасово коментую = app.use(
  // cors({
  //   origin: [
  //     env('APP_DOMAIN'),
  //     для тестів а потім повертаю з реальним задеплоїним УРЛ фронтенда

  // app.use(
  //   cors({
  //     origin: [
  //       env('APP_DOMAIN'),
  //       // замінити перший УРЛ =  'https://booking-auth-react.vercel.app' на урл фронтенда для бронювання
  //       // 'https://booking-auth-react.vercel.app',
  //       'http://localhost:5173',
  //       'http://localhost:5175',
  //       'http://localhost:5176',
  //     ],
  //     credentials: true, // Дозволяє передавати cookies та токени
  //     allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'], // Дозволені заголовки
  //     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // Дозволені методи
  //   }),
  // );

  app.use(cookieParser()); //  `cookieParser()` після `cors()`

  //  Preflight запити теж з `credentials: true`
  // тимчасово коментую для тестів а потім повертаю з реальним задеплоїним УРЛ фронтенда

  // app.options(
  //   '*',
  //   cors({
  //     origin: [
  //       // замінити перший УРЛ =  'https://booking-auth-react.vercel.app' на урл фронтенда для бронювання
  //       // 'https://booking-auth-react.vercel.app',
  //       'http://localhost:5173',
  //       'http://localhost:5175',
  //       'http://localhost:5176',
  //     ],
  //     credentials: true,
  //     allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
  //     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  //   }),
  // );

  app.use(
    express.json({
      type: ['application/json', 'application/VideoEncoder.api+json'],
      limit: '500kb',
    }),
  );

  app.use(logger);
  app.get('/', async (req, res) => {
    res.status(200).json({ message: 'Hello User!' });
  });
  app.use('/auth', authRouter);
  app.use('/contacts', contactsRout);
  app.use('/bookings', bookingsRouter); //  шлях до логіки бронювання
  app.use('/api-docs', swaggerDocs());
  app.use(notFoundHandler);
  app.use(errorHandler);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
