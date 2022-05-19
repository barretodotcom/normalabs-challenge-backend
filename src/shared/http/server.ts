/* eslint-disable @typescript-eslint/no-unused-vars */
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes/router';
import errorMidleware from './middlewares/middlewares';
import '@shared/typeorm';
const app = express();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errorMidleware);

app.listen(process.env.PORT || 3000, () => {
    console.log('running... 🏆');
    console.log('http://localhost:' + process.env.PORT);
});
