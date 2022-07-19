import { Request, Response } from "express";
import { AuthSessionUser } from "../services/AuthSessionUser";

export class SessionController {
    public async post(request: Request, response: Response): Promise<Response> {
        const authSessionUser = new AuthSessionUser();

        const { email, password } = request.body;

        const session = await authSessionUser.execute({ email, password });

        return response.json(session);
    }
}