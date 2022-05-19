import AppError from '@shared/errors/AppErrors';
import { getCustomRepository } from 'typeorm';
import Token from '../typeorm/entities/Token';
import UsersRepository from '../typeorm/repository/UsersRepository';
import { UserTokenRepository } from '../typeorm/repository/UserTokenRepository';

interface IEmail {
    email: string;
}

export class SendForgotPasswordService {
    public async execute({ email }: IEmail): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const tokenRepository = getCustomRepository(UserTokenRepository);
        const user = await usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError('Email não encontrado.');
        }
        const token = await tokenRepository.generateToken(user.id);
    }
}
