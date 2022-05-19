import AppError from '@shared/errors/AppErrors';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { ChangePasswordService } from '../services/ChangePasswordService';
import { SendForgotPasswordService } from '../services/SendForgotPasswordService';

interface IUserRecover {
    tokenRequest: string;
    password: string;
}

export default class ForgotPasswordController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const sendForgotPasswordService = new SendForgotPasswordService();
        const email = request.body;
        await sendForgotPasswordService.execute(email);
        return response.status(204).json();
    }
}
