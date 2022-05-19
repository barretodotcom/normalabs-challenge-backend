import { celebrate, Segments } from 'celebrate';
import Router from 'express-promise-router';
import Joi from 'joi';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.get('/', isAuthenticated, usersController.list);
usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            age: Joi.number().integer().required(),
        }),
    }),
    usersController.create,
);
usersRouter.put(
    '/:id',
    celebrate({
        [Segments.PARAMS]: Joi.object({
            id: Joi.string().uuid().required(),
        }),
        [Segments.BODY]: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            age: Joi.number().integer().required(),
        }),
    }),
    usersController.update,
);

usersRouter.get('/findone/:id', usersController.findUser);

export default usersRouter;
