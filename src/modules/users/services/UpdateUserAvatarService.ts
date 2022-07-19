import { upload } from "@config/upload";
import path from "path";
import { FindUserByIdService } from "./FindUserById";
import fs from 'fs'
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../typeorm/repositories/UsersRepositories";

interface IRequest {
    userId: string;
    avatarFilename: string | undefined;
}

export class UpdateUserAvatarService {

    public async execute({ userId, avatarFilename }: IRequest) {
        const findUserByIdService = new FindUserByIdService();
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await findUserByIdService.execute(userId);

        if (user.avatar) {
            const userAvatarFilePath = path.join(upload.directory, user.avatar);

            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename as string;

        await usersRepository.save(user);

        return user;
    }
}