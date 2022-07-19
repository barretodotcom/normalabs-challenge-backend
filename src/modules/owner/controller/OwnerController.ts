import { Request, Response } from "express";
import { CreateOwnerService } from "../services/CreateOwnerService";
import { SessionOwnerService } from "../services/SessionOwnerService";

export class OwnerController {
    public async create(request: Request, response: Response): Promise<Response> {
        const createOwnerService = new CreateOwnerService();

        const { email, password } = request.body;

        const ownerAndToken = await createOwnerService.execute({ email, password });

        return response.json(ownerAndToken);
    }

    public async login(request: Request, response: Response): Promise<Response> {
        const sessionOwnerService = new SessionOwnerService();

        const { email, password } = request.body;

        const ownerAndToken = await sessionOwnerService.execute({ email, password });

        return response.json(ownerAndToken);
    }
}