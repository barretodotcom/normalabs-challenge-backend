import validateFile, { upload } from '@config/upload';
import { isUserAuthenticated } from '@shared/http/middlewares/isUserAuthenticated';
import { celebrate, Segments } from 'celebrate';
import Router from 'express-promise-router';
import Joi from 'joi';
import multer from 'multer';
import { UserAvatarController } from '../controllers/UserAvatarController';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const uploadFile = multer(upload);

usersRouter.get('/list', usersController.list);
usersRouter.post('/create', validateFile, usersController.create);

usersRouter.put('/update/:userId', usersController.update);
usersRouter.get('/findone/:userId', usersController.findUser);


usersRouter.patch('/avatar',
    isUserAuthenticated,
    uploadFile.single('avatar'),
    userAvatarController.update
);
export default usersRouter;
