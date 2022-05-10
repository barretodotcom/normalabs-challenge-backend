import AppError from '@shared/errors/AppErrors';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';

interface UserRequest {
    name: string;
    email: string;
    password: string;
    birthdate: Date;
    gen: string;
}

class CreateUserService {
    public async execute({
        name,
        email,
        password,
        birthdate,
        gen,
    }: UserRequest) {
        const userRepository = getCustomRepository(UserRepository);
        const userExist = await userRepository.findByEmail(email);

        if (userExist) {
            throw new AppError('Usuário já existente.');
        }
        const user = userRepository.create({
            name,
            email,
            password,
            birthdate,
            gen,
        });

        await userRepository.save(user);

        return user;
    }
}

export default CreateUserService;
