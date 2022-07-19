import AppError from "@shared/errors/AppErrors";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../typeorm/repositories/UsersRepositories";

interface IUpdateUser {
    name: string;
    email: string;
    password: string;
}

export class UpdateUserService {
    public async execute({ name, email, password }: IUpdateUser) {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("E-mail não encontrado.");
        }

        user.name = name;
        user.email = email;
        user.password = password;

        await usersRepository.save(user);

        return user;
    }
}