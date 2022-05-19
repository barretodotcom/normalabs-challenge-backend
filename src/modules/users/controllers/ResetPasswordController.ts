import { Request, Response } from 'express';
import { ChangePasswordService } from '../services/ChangePasswordService';

export default class ResetPasswordController {
    public async post(request: Request, response: Response) {
        const { token, password } = request.body;

        const changePasswordService = new ChangePasswordService();
        await changePasswordService.execute({
            token,
            password,
        });
        return response.status(204).json();
    }
}
