import AppError from "@shared/errors/AppErrors";
import { getCustomRepository } from "typeorm";
import { User } from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepositories";

export class FindUserByIdService {
    public async execute(id: string): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(id);

        if (!user) {
            throw new AppError("Usuário não encontrado.");
        }

        return user;
    }
}