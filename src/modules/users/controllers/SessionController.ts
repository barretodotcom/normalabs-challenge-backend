import AuthSessionUser from '@modules/users/services/AuthSessionUser';
import { Request, Response } from 'express';
export default class SessionController {
    public async post(request: Request, response: Response): Promise<Response> {
        const authSessionUser = new AuthSessionUser();

        const { email, password } = request.body;

        const user = await authSessionUser.execute({ email, password });
        return response.json({ lane: 'oi' });
    }
}
