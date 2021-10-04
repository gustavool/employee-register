import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { createConnection } from 'typeorm';

import 'express-async-errors';
import { router } from './employees.routes';
import { AppError } from './errors/AppError';
import swaggerFile from './swagger.json';

import './database';
import '../container';

const app = express();

createConnection();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(cors());

app.use(express.json());

app.use(router);

app.use(
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

export { app };
