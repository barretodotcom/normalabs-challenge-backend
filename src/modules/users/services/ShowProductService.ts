import AppError from '@shared/errors/AppErrors';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/users';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IShowProductService {
    id: string;
}

class ShowProductService {
    public async execute({ id }: IShowProductService): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findOne(id);

        if (!user) {
            throw new AppError('Usuário não encontrado.');
        }
        return user;
    }
}

export default ShowProductService;
