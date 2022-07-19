import { Request, Response } from "express";
import { UpdateUserAvatarService } from "../services/UpdateUserAvatarService";

export class UserAvatarController {
    public async update(request: Request, response: Response) {
        const updateUserAvatarService = new UpdateUserAvatarService();

        const user = await updateUserAvatarService.execute({
            userId: request.user.id,
            avatarFilename: request.file?.filename
        })

        return response.json(user);
    }
}