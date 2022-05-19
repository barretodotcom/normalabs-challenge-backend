import { celebrate, Segments } from 'celebrate';
import Router from 'express-promise-router';
import Joi, { ref } from 'joi';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const emailSendRouter = Router();
const sendEmailController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();
emailSendRouter.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: Joi.object({
            email: Joi.string().required(),
        }),
    }),
    sendEmailController.create,
);

export default emailSendRouter;
