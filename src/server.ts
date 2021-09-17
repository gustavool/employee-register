import express from 'express';
import { createConnection } from 'typeorm';

import './database';
import '../container';

import { router } from './routes';

createConnection();
const app = express();

app.use(express.json());

app.use(router);

app.listen(3333, () => console.log('🔥 Server is running!!!'));
