import 'reflect-metadata';
import '../../db';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes/router';
import errorMidleware from './middlewares/middlewares';
import { upload } from '@config/upload';
import { isUserAuthenticated } from './middlewares/isUserAuthenticated';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static('./uploads'));
app.use(routes);

app.use(errorMidleware);

app.listen(3000, async () => {
    console.log("database connected!");
    console.log('running api... 🏆');
    console.log('http://localhost:' + 3000);
});
