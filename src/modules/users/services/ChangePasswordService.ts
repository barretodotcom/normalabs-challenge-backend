import AppError from '@shared/errors/AppErrors';
import { getCustomRepository } from 'typeorm';
import { UserTokenRepository } from '../typeorm/repository/UserTokenRepository';
import { addHours, isAfter } from 'date-fns';
import UsersRepository from '../typeorm/repository/UsersRepository';
import { genSaltSync, hashSync } from 'bcryptjs';
import { User } from '../typeorm/entities/User';

interface IChangePassword {
    token: string;
    password: string;
}

export class ChangePasswordService {
    public async execute({ token, password }: IChangePassword): Promise<void> {
        const tokenRepository = getCustomRepository(UserTokenRepository);
        const usersRepository = getCustomRepository(UsersRepository);
        const userToken = await tokenRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('Token inválido.');
        }

        const user = await usersRepository.findById(userToken.userId);

        if (!user) {
            throw new AppError('Este usuário não existe.');
        }

        const hourValid = addHours(userToken.createdAt, 2);

        if (isAfter(Date.now(), hourValid)) {
            throw new AppError('Este token expirou.');
        }

        const salt = genSaltSync();
        user.password = hashSync(password, salt);

        await usersRepository.save(user);
    }
}
