import AppError from '@shared/errors/AppErrors';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/users';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IChangePasswordService {
    id: string;
    name: string;
    email: string;
    password: string;
    birthdate: Date;
    gen: string;
}

class ChangePasswordService {
    public async execute({
        id,
        name,
        email,
        password,
        gen,
    }: IChangePasswordService): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findOne(id);

        if (!user) {
            throw new AppError('Usuário não encontrado.');
        }

        const userExists = await userRepository.findByEmail(email);

        if (userExists && password != user.password) {
            throw new AppError('Você não pode trocar sua senha por uma igual à anterior.');
        }

        user.name = name;
        user.email = email;
        user.password = password;
        user.gen = gen;

        await userRepository.save(user);

        return user;
    }
}

export default ChangePasswordService;
