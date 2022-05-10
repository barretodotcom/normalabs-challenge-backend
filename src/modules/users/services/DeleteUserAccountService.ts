import AppError from '@shared/errors/AppErrors';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IDeleteUserAccountService {
    id: string;
}

class DeleteUserAccountService {
    public async execute({ id }: IDeleteUserAccountService): Promise<void> {
        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findOne(id);

        if (!user) {
            throw new AppError('Usuário não existente.');
        }
        await userRepository.remove(user);
    }
}
