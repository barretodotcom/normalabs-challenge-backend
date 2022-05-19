import AuthSessionUser from '@modules/users/services/AuthSessionUser';
import AppError from '@shared/errors/AppErrors';
import { Request, Response } from 'express';
import validator from 'validator';
export default class SessionController {
    public async post(request: Request, response: Response): Promise<Response> {
        const authSessionUser = new AuthSessionUser();

        const { email, password } = request.body;

        const user = await authSessionUser.execute({ email, password });
        return response.json(user);
    }
}
