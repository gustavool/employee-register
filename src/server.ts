import express, { NextFunction, Request, Response } from 'express';
import { createConnection } from 'typeorm';
import 'express-async-errors';

import { AppError } from './errors/AppError';
import { router } from './routes';

import './database';
import '../container';

createConnection();
const app = express();

app.use(express.json());

app.use(router);

app.use(
  // eslint-disable-next-line no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log('🔥 Server is running!!!'));
