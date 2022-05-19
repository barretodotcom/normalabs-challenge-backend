import { celebrate, Segments } from 'celebrate';
import Router from 'express-promise-router';
import Joi from 'joi';
import ResetPasswordController from '../controllers/ResetPasswordController';

const redefinePasswordRouter = Router();
const resetPasswordController = new ResetPasswordController();
redefinePasswordRouter.post(
    '/redefine',
    celebrate({
        [Segments.BODY]: Joi.object({
            token: Joi.string().required(),
            password: Joi.string().required(),
        }),
    }),
    resetPasswordController.post,
);

export default redefinePasswordRouter;
