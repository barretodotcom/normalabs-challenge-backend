/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes/router';
import errorMidleware from './middlewares/middlewares';
import AppError from '@shared/errors/AppErrors';
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errorMidleware);

app.listen(3000, () => {
    console.log('running... 🏆');
    console.log('http://localhost:3000');
});
