import AppError from "@shared/errors/AppErrors";
import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { sign } from 'jsonwebtoken';
import { UsersRepository } from "../typeorm/repositories/UsersRepositories";
import authConfig from "@config/authConfig";
import { User } from "../typeorm/entities/User";

interface IUserSession {
    email: string;
    password: string;
}

interface IResponse {
    token: string;
    user: User;
}

export class AuthSessionUser {
    public async execute({ email, password }: IUserSession): Promise<IResponse> {

        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("E-mail não encontrado.");
        }

        if (!compare(password, user.password)) {
            throw new AppError("Senha inválida.");
        }

        const token = sign({}, authConfig.jwt.userSecret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn
        })

        return { user, token };
    }
}