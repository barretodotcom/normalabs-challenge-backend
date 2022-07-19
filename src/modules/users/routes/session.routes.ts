import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import { SessionController } from '../controllers/SessionController';

const sessionRouter = Router();

const sessionController = new SessionController();

sessionRouter.post('/', sessionController.post);

export default sessionRouter;
