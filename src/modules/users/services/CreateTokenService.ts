import AppError from '@shared/errors/AppErrors';
import { getCustomRepository } from 'typeorm';
import { UserTokenRepository } from '../typeorm/repository/UserTokenRepository';

class CreateTokenService {
    public async execute(userId: string) {
        const tokenRepository = getCustomRepository(UserTokenRepository);

        const token = await tokenRepository.generateToken(userId);
        if (!token) {
            throw new AppError('Usuário não existente');
        }

        return token;
    }
}
