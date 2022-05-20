import AppError from '@shared/errors/AppErrors';
import { compare, compareSync } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repository/UsersRepository';
import validator from 'validator';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/authConfig';
import { Console } from 'console';

interface IUser {
    email: string;
    password: string;
}

interface IResponse {
    token: string;
    user: User;
}

export default class AuthSessionUser {
    public async execute({ email, password }: IUser): Promise<IResponse> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findByEmail(email);

        if (!validator.isEmail(email)) {
            throw new AppError('Insira um email válido.');
        }

        if (!user) {
            throw new AppError('Este email não está cadastrado.');
        }
        if (!compareSync(password, user.password)) {
            throw new AppError('Senha inválida.');
        }
        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return { user, token };
    }
}
